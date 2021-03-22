<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-27 19:22:26
 * @LastEditTime: 2021-03-22 18:27:55
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="login" :style="loginStyle">
    <div class="login-txt">系统登录中......</div>
    <div class="logingif">
      <img src="@public/images/loading.gif" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import {
  ServWechatLogin,
  ServGetEnteInfo,
  ServLogin,
  ServGetMemberInfo,
} from "@/service/appService";
import router from "@/router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
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
            if (queryParams.userType === "share") {
              // 分享页面跳转过来的，如果是承接人，转到红包页面，如果是客户，转到二维分享页面
              if (userInfo.isAdd === 1) {
                // 是否为活动承接人或已添加企业微信好友
                router.push(`/customer/hongbao?result=${result}`);
              } else {
                router.push(`/customer/sharePoster?result=${result}`);
              }
              return;
            }
          }
          redirectUrl
            ? (window.location.href = redirectUrl)
            : router.push("/");
        })
        .catch((err) => {
          console.log("登录失败", err);
        });
    };

    onMounted(() => {
      // let userInfo = JSON.parse(window.sessionStorage.userInfo); // store.state.userInfo //
      if (window.sessionStorage.token) {
        if (result) {
          const queryParams = JSON.parse(decodeURIComponent(result));
          if (queryParams.userType === "share") {
            const { activityId } = queryParams;
            ServGetMemberInfo({ activityId }).then((res) => {
              console.log("分享页面进来，需要重新获取最新用户信息");
              store.commit("setUserInfo", res.data);
              const userInfo = res.data;
              // 分享页面跳转过来的，如果是承接人，转到红包页面，如果是客户，转到二维分享页面

                

              if (userInfo.isUndertaker || userInfo.isAdd === 1) {
                // 是否为活动承接人或已添加企业微信好友
                router.push(`/customer/hongbao?result=${result}`);
              } else {
                router.push(`/customer/sharePoster?result=${result}`);
              }
            });
            return;
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
          //FIXME: 
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
    return { loginStyle, gifStyle };
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