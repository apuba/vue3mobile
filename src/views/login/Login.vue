<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-27 19:22:26
 * @LastEditTime: 2021-03-24 22:07:11
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="login" :style="loginStyle">
    <div class="login-txt">{{ loginTxt }}</div>
    <div class="logingif">
      <img src="@public/images/loading.gif" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import {
  ServWechatLogin,
  ServGetEnteInfo,
  ServLogin,
  ServGetMemberInfo,
  ServeGetActivityRule,
  ServGetActivity,
  ServWxSign,
  ServWechatSign,
  ServGetLoation,
  ServGetCityInfo
} from "@/service/appService";
import router from "@/router";
import { useStore } from "vuex";
import { lnglatDistance } from "@/common/helper/tools";

export default defineComponent({
  setup() {
    const refState = reactive({
      loginTxt: '系统登录中......'
    })
    const store = useStore();
    const loginStyle = {
      backgroundImage: "url(" + require("@public/images/login.jpg") + ")",
    };
    const gifStyle = {
      backgroundImage: "url(" + require("@public/images/logo.jpg") + ")",
    };
    const code = (router.currentRoute.value.query.code as string) || "";
    const state = (router.currentRoute.value.query.state as string) || ""; // URL自定义参数，用于区分微信公众号授权还是企业微信号授权。
    const result = router.currentRoute.value.query.result as string;
    const redirectUrl = router.currentRoute.value.query.redirect_url as string; // token过期时被 重定向的页面

    // const wxCode = (router.currentRoute.value.query.wxCode as string);

    // 用户登录后校验的逻辑
    const loginValid = async (queryParams: any) => {
      const { activityId } = queryParams;
      const query = {
        params: {
          activityId,
          type: 1
        },
        pageIndex: 1,
        pageRows: 1,
      };
      refState.loginTxt = '正在检查当前活动状态...'
      // 获取当前活动信息
      const activityRes = await ServGetActivity(query);
      if (activityRes.records.length) {
        const activity = activityRes.records[0];
        if (activity.activityStatus !== 2) {
          router.push(`/noPermission?error=活动已结束或暂停中`);
          return
        }
      } else {
        router.push(`/noPermission?error=活动已结束`);
        return
      }

      refState.loginTxt = '正在检查当前用户权限...'
      // 获取当前用户信息
      const member = await ServGetMemberInfo({ activityId });
      store.commit("setUserInfo", member.data);
      const userInfo = member.data;

      if (userInfo.isUndertaker) {
        console.log('当前用户为活动承接人');
        router.push(`/customer/hongbao?result=${result}`);
        return;
      }

      // 获取活动的规则（高级设置）
      const rulesRes = await ServeGetActivityRule(activityId);
      if (rulesRes.map || rulesRes.range) {
        refState.loginTxt = '正在检查活动区域约束条件...';
        // 校验区域
        // 微信配置签名
        await ServWechatSign();
        const locationInfo: any = await ServGetLoation(); // 获取用户位置（坐标）              
        const cityInfo: any = await ServGetCityInfo({ lng: locationInfo.longitude, lat: locationInfo.latitude });
        console.log('定位后的地址', cityInfo);
        let cityAdCode = cityInfo.addressComponent.adcode; // 当前的城市区域编辑，需要转为城市的adCode
        cityAdCode = cityAdCode.substr(0, 4) + '00';

        if (rulesRes.map && !rulesRes.map.value.toString().includes(cityAdCode)) {
          router.push(`/noPermission?error=您所在的城市不参与该活动`);
          return
        }
        if (rulesRes.range && rulesRes.range.center) {
          const lnglat = rulesRes.range.center.split(',').map(val => parseFloat(val));
          const distance = lnglatDistance(locationInfo.longitude, locationInfo.latitude, lnglat[0], lnglat[1]); // 两经纬度距离
          if (rulesRes.range.value < distance / 1000) {
            router.push(`/noPermission?error=您不在该活动的指定范围内`);
            return
          }
        }
      }

      if (rulesRes.gender && rulesRes.gender.value != userInfo.gender) {
        router.push(`/noPermission?error=活动限制了只有${rulesRes.gender.value == 1 ? '男性' : '女性'}可以参与`);
        return
      }

      debugger;
      if (userInfo.isAdd === 1) {
        // 是否为活动承接人或已添加企业微信好友
        router.push(`/customer/hongbao?result=${result}`);
      } else {
        router.push(`/customer/sharePoster?result=${result}`); // 前去添加微信好友页面
      }

    }


    const login = () => {
      // 授权后进行登录处理
      let queryParams;
      let activityId;
      let wxCode;
      if (result) {
        queryParams = JSON.parse(decodeURIComponent(result));
        activityId = queryParams.activityId;
        wxCode = queryParams.wxCode;
      }

      ServLogin({ code, activityId, wxCode })
        .then((userInfo) => {
          store.commit("setUserInfo", userInfo); // 把用户信息存到store
          if (result) {
            const queryParams = JSON.parse(decodeURIComponent(result));
            loginValid(queryParams);
            return
          }
          redirectUrl
            ? (window.location.href = redirectUrl)
            : router.push("/");
        })
        .catch((err) => {
          console.log("登录失败", err);
        });
    };


    onMounted(async () => {
      // let userInfo = JSON.parse(window.sessionStorage.userInfo); // store.state.userInfo //
      if (window.sessionStorage.token) {
        if (result) {
          const queryParams = JSON.parse(decodeURIComponent(result));
          if (queryParams.userType === "share") {
            loginValid(queryParams);
            return
          }
        }
        redirectUrl
          ? (window.location.href = decodeURIComponent(redirectUrl))
          : router.push("/");
      }

      if (!code || state == "is_wx_login") {
        // state === is_wx_login  时为公众号重定向到此页面，需要再进行企业号授权
        // const queryObj = router.currentRoute.value.query;
        let url = window.location.href.split("#")[0];
        debugger;


        if (state === "is_wx_login") {

          // 包含公众号授权信息
          url = window.location.origin + window.location.pathname + '?';

          const resultURL = JSON.parse(decodeURIComponent(result));
          resultURL.wxCode = code;
          url += 'result=' + encodeURIComponent(JSON.stringify(resultURL))

          /*  Object.keys(queryObj).forEach(key => {
             if (key === 'code') {
               url = url + 'wxCode=' + queryObj[key] + '&'
             } else if (key === 'result') {
               url = url + 'result=' + encodeURIComponent(JSON.stringify(queryParams)) + '&'
             } else if (key !== 'state') {
               url = url + key + '=' + queryObj[key] + '&'
             }
           }) 
           url = url.substr(0, url.length - 1);*/
          console.log('微信公众号授权后再到企业微信授权url', url)

        }
        ServWechatLogin("ADMIN", url); // 授权
      } else {
        // 授权后进行登录处理
        login();
      }
    });
    return { loginStyle, gifStyle, ...toRefs(refState) };
  },
});
</script>

<style scoped lang="scss">
.login {
  background: #87dfed bottom no-repeat;

  text-align: center;
  height: 100vh;
  background-size: 100%;
  overflow: hidden;
  position: relative;
  //   background-image: url("/public/images/login.jpg");
}
.logingif {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  position: absolute;
  bottom: 230px;
  left: 25%;
  img {
    max-width: 100%;
    mix-blend-mode: multiply; // 使用图片正片叠底滤镜
  }
}

.login-txt {
  position: absolute;
  width: 100%;
  top: 40%;
  font-size: 16px;
  color: #244d8a;
  font-weight: bold;
}
</style>