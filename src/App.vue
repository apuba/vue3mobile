<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-24 22:18:17
 * @LastEditTime: 2021-03-14 13:00:02
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <!--   <transition
    enter-active-class="animate__animated animate__slideInLeft"
    leave-active-class="animate__animated animate__slideOutRight"
  >
    <router-view class="routerStyle" />
  </transition>-->

  <transition>
    <router-view />
  </transition>
</template>

<script lang="ts">
import Vconsole from "vconsole";
import { defineComponent, onMounted } from "vue";
import store from "@/store";
export default defineComponent({
  setup() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(store.state));
    });

    const sessionStore: string = sessionStorage.store;
    if (sessionStore) {
      store.replaceState(
        Object.assign({}, store.state, JSON.parse(sessionStore))
      );
    }

    onMounted(() => {
      const easterEggs = window.localStorage.easterEggs || 0;
      const vconsoleUser = window.localStorage.vconsoleUser ? JSON.parse(window.localStorage.vconsoleUser) : {};

      if (parseInt(easterEggs) >= 5 && (vconsoleUser.memberId === 221 || vconsoleUser.name.indexOf('ShuiYiMengLong') > -1)) {
        window.vConsole = new Vconsole();
      } else {
        window.localStorage.easterEggs = 0;
      }

    })
    return {};
  },
});
</script>

<style lang="scss">
// @import "./style/animate.css";
@import "./style/default.scss";
// @import './style/iconfont.css';
@import url("//at.alicdn.com/t/font_2305781_h09f1xmqlkp.css");
.routerStyle {
  position: absolute;
  width: 100%;
}
</style>
