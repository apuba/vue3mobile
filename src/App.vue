<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-24 22:18:17
 * @LastEditTime: 2021-02-11 01:30:50
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
import { defineComponent } from "vue";
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
