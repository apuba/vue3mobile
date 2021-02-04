<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-27 19:22:26
 * @LastEditTime: 2021-02-04 00:55:47
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
    onMounted(() => {
      debugger;
      const redirect_url = router.currentRoute.value.query
        .redirect_url as string;
      const result = router.currentRoute.value.query.result as string;
      if (window.localStorage.token) {
        if (result) {
          
          const userInfo = store.state.userInfo // JSON.parse(window.localStorage.userInfo);
          const queryParams = JSON.parse(decodeURIComponent(result));
          if (queryParams.userType === "share") {
            // 分享页面跳转过来的，如果是承接人，转到红包页面，如果是客户，转到二维分享页面
            if (userInfo.isUndertaker || userInfo.isAdd===1) {
              // 是否为活动承接人或已添加企业微信好友
              router.push(`/customer/hongbao?result=${result}`);
            } else {
              router.push(`/customer/sharePoster?result=${result}`);
            }
            return;
          }
        }
        redirect_url ? (window.location.href = redirect_url) : router.push("/");
        return;
      }
      if (!code) {
        ServWechatLogin("ADMIN"); // 授权
      } else {
        // 授权后进行登录处理
        ServLogin({ code })
          .then((res) => {
            store.commit("setUserInfo", res); // 把用户信息存到store
            if (result) {
              const queryParams = JSON.parse(decodeURIComponent(result));
              if (queryParams.userType === "share") {
                // 分享页面跳转过来的，如果是承接人，转到红包页面，如果是客户，转到二维分享页面
                if (res.isUndertaker) {
                  router.push(`/customer/hongbao?result=${result}`);
                } else {
                  router.push(`/customer/sharePoster?result=${result}`);
                }
                return;
              }
            }
            redirect_url ? (window.location.href = redirect_url) : router.push("/");
          })
          .catch((err) => {
            console.log("登录失败", err);
          });
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