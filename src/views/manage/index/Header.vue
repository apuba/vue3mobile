<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-01 20:41:40
 * @LastEditTime: 2021-01-28 01:23:46
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="header">
    <div class="header-bg">
      <h2>{{ enteInfo.corpName }}</h2>
      <div class="small">企业头像与名称将用于对外展示</div>

      <span class="logo" @click="openEasterEggs">
        <img :alt="enteInfo.corpFullName" :src="enteInfo.corpSquareLogoUrl" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, useStore } from "vuex";
import { Notify } from 'vant';
import Vconsole from "vconsole";
export default defineComponent({
  computed: {
    ...mapState(["title", 'enteInfo'])
  },
  setup() {
  const store = useStore();
   const openEasterEggs = ()=> {
      // 打开vconsole
      let easterEggs = window.localStorage.easterEggs || 0;
      easterEggs++;
      if (easterEggs === 5) {
        window.vConsole = new Vconsole(); // 打开vconsole
        Notify({ type: "warning", message: "vconsole 已经打开" });
        window.localStorage.vconsoleUser = JSON.stringify({id: store.state.userInfo.memberId, name: store.state.userInfo.name});
      } else if (easterEggs > 10) {
        easterEggs = 0;
        window.vConsole && window.vConsole.destroy();
        Notify({ type: "success", message: "vconsole 已经关闭" });
      }
      console.log(easterEggs);
      window.localStorage.easterEggs = easterEggs;
    }
    return { openEasterEggs };

  },
  mounted() {
    // Notify('另圆圆中')
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 176px;
  color: #fff;
  position: relative;
  text-align: center;
  h2 {
    padding-top: 50px;
    margin: 0;
    line-height: 40px;
    font-size: 24px;
  }
  .small {
    opacity: 0.66;
    font-weight: normal;
  }
}
.header-bg {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}
.header-bg:after {
  width: 140%;
  height: 100%;
  position: absolute;
  left: -20%;
  top: 0;
  z-index: -1;
  content: "";
  border-radius: 0 0 50% 50%;
  background-image: linear-gradient(-270deg, #2af598 0%, #009efd 100%);
}

.logo {
  width: 90px;
  height: 90px;
  position: absolute;
  bottom: -40px;
  left: 50%;
  border-radius: 50%;
  overflow: hidden;
  margin-left: -45px;
  box-shadow: #ccc 0 5px 10px;
  background-color: #fff;
  line-height: 90px;
  img {
    max-height: 100%;
    max-width: 100%;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>