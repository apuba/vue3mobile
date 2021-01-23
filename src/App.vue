<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-24 22:18:17
 * @LastEditTime: 2021-01-22 03:53:49
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <!--   <transition
    enter-active-class="animate__animated animate__slideInLeft"
    leave-active-class="animate__animated animate__slideOutRight"
  >
    <router-view class="routerStyle" />
  </transition> -->

  <transition>
    <router-view />
  </transition>
</template>

<style lang="scss">
// @import "./style/animate.css";
@import "./style/default.scss";
// @import './style/iconfont.css';
@import url("//at.alicdn.com/t/font_2305781_sw3xyff14d.css");
.routerStyle {
  position: absolute;
  width: 100%;
}
</style>
