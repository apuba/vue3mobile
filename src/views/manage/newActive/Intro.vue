<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-03 16:37:14
 * @LastEditTime: 2021-01-18 19:54:49
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div>
    <van-nav-bar
      title="活动介绍"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body">
      <div class="bg"></div>
      <div class="header">
        <div class="header-bg">
          <div class="hongbao">
            <img src="@public/images/hongbao.png" />
          </div>
        </div>
      </div>
      <div class="container">
        <fieldset>
          <legend>活动介绍</legend>
          <div>
            <h3>活动用于品牌曝光、吸粉、获客。</h3>
            <p>
              商家可以设置自定义主题的列表红包，将红包随机金额设置在1元以上，然后充值发布活动，用户通过红包链接首次添加企业成员的企业微信，成员将会自动给用户回复活动方案和红包链接，用户点击后获取1元以上的随机现金红包。
              同时，将引导用户通过邀请1~5个好友，再次获得拆红包的机会
            </p>
          </div>
        </fieldset>

        <fieldset>
          <legend>裂变方案</legend>
          <div class="active-item">
            <div class="icon">
              <span class="iconfont icon-7"></span>
            </div>
            <div class="txt">
              <h4 class="name">新人红包</h4>
              <div>首次添加企业微信获取红包</div>
            </div>
          </div>
          <div class="active-item">
            <div class="icon">
              <span class="iconfont icon-fenxiang"></span>
            </div>
            <div class="txt">
              <h4 class="name">邀请N 个好友裂变</h4>
              <div>生成专属的链接发送给微信好友</div>
            </div>
          </div>
          <div class="active-item">
            <div class="icon">
              <span class="iconfont icon-hongbao"></span>
            </div>
            <div class="txt">
              <h4 class="name">邀请成功再得红包</h4>
              <div>好友添加后再得红包奖励</div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="create-btn">
        <van-button block type="primary" round to="/createActive"
          >新建活动</van-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Button, NavBar } from "vant";
import router from '@/router';

export default defineComponent({
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  setup() {
    
    const methods = {
      onClickLeft: () => {
        router.go(-1);
      },
    }
    return { ...toRefs(methods) };
  }
});
</script>


<style lang="scss" scoped>
.active-item {
  padding: 16px;
  border-bottom: 1px dotted #0dbadd;
  &:last-child {
    border: none;
  }
  .icon {
    float: left;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #0dbadd;
    border: 1px solid #0dbadd;
    border-radius: 24px;
    background-color: #fff;

    .iconfont {
      font-size: 28px;
    }
  }
  .txt {
    height: 48px;
    margin-left: 64px;
    font-size: 12px;
    h4 {
      margin: 0;
      font-size: 14px;
    }
  }
}
.create-btn {
  padding: 16px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.body {
  overflow-x: hidden;
}
.bg {
  height: 100vh;
  background-image: url("../../../../public/images/bg.png");
  background-size: 100%;
  opacity: 0.3;
  position: absolute;
  z-index: -1;
  width: 100vw;
}
.header {
  height: 176px;
  color: #fff;
  position: relative;
  text-align: center;
}
.header-bg {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  //   overflow-x: hidden;
}
.header-bg:after {
  width: 140%;
  height: 100%;
  position: absolute;
  left: -20%;
  top: 0;
  z-index: -2;
  content: "";
  border-radius: 0 0 50% 50%;
  background-image: linear-gradient(-270deg, #2af598 0%, #009efd 100%);
}

.hongbao {
  padding-top: 50px;
  img {
    width: 234px;
    margin: 0 auto;
  }
}
.container {
  padding-top: 70px;
  padding: 70px 16px;

  fieldset {
    border: 1px dotted #ccc;
    border-radius: 8px;
    background-color: #f0fcff;
    padding: 4px 16px;
    font-size: 14px;
    line-height: 24px;
    color: #333;
    margin-bottom: 16px;
  }
  legend {
    text-align: center;
    font-size: 16px;
    display: inline-block;
    background-color: #0dbadd;
    border-radius: 32px;

    padding: 4px 20px;
    color: #fff;
  }
}
</style>