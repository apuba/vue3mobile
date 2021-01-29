<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-29 18:44:18
 * @LastEditTime: 2021-01-30 02:32:36
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="body" :style="bgStyle">
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img width="375" height="160" :src="item.url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main-title">
      <div class="txt" v-show="!isShared">
        <h1>红包的主标题</h1>
        <h4>红包的可以长一点的副标题</h4>
      </div>
      <div v-show="isShared">
        <img src="@public/images/yuan50.png" />
      </div>
    </div>
    <div class="hongbao">
      <div class="hongbao-top hongbao-bg" :style="hongbaoTop">
        <van-swipe class="my-swipe" :autoplay="2500" :show-indicators="false">
          <van-swipe-item>
            <span class="title">单个1~50元</span>
          </van-swipe-item>
          <van-swipe-item>
            <span class="title">再邀3人，可拆1次</span>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="hongbao-bg" :style="hongbaoBottom">
        <div class="hongbao-middle hongbao-bg" :style="hongbaoMiddle">
          <span class="take" v-show="!isShared" @click="isShared = !isShared"
            >拆</span
          >
          <div v-show="isShared">
            <span class="shared">+</span>
            <span class="shared">+</span>
            <span class="shared">+</span>
          </div>
        </div>
        <div class="hongbao-bottom">
          <p v-show="!isShared">红包还剩7890个</p>
          <p v-show="isShared">
            <van-button type="danger" class="btn" block round
              >分享给好友</van-button
            >
          </p>
          <div class="remark">
            <span> 红包由 XXXX 公司提供 </span>
            <span>“吸粉宝”技术支持 </span>
          </div>
        </div>
      </div>
    </div>
    <div class="poster" @click="showPoster = true">生成海报</div>

    <van-overlay :show="showPoster" @click="showPoster = false">
      <Poster />
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { Swipe, SwipeItem, Image, Button, Overlay } from 'vant';
import Poster from './Poster.vue';

export default defineComponent({
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Button.name]: Button,
    [Overlay.name]: Overlay,
    Poster
  },
  setup() {

    const state = reactive({
      bgStyle: {
        backgroundImage: ' url(' + require('@public/images/hongbao2.png') + '),url(' + require('@public/images/hongbaobg.jpg') + ') '
      },
      hongbaoTop: {
        backgroundImage: ' url(' + require('@public/images/hongbaobgTop.jpg') + ')'
      },
      hongbaoMiddle: {
        backgroundImage: 'url(' + require('@public/images/hongbaoMiddle.jpg') + ')'
      },
      hongbaoBottom: {
        backgroundImage: ' url(' + require('@public/images/hongbaobgBottom.jpg') + ')'
      },
      bannerList: [

        {
          url: require('@public/images/banner1.jpg')
        },
        {
          url: require('@public/images/banner2.jpg')
        }
      ],
      showPoster: false,
      isShared: false // 进行分享状态
    })

    return { ...toRefs(state) }
  }
})
</script>

<style scoped lang="scss">
.poster {
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  border-radius: 35px;
  background-color: rgba($color: #f00, $alpha: 0.7);
  color: #fff;
  font-size: 14px;
  position: absolute;
  right: 15px;
  bottom: 15px;
}
.body {
  height: 100vh;
  background: #0fbcdc no-repeat bottom;
  background-size: 100%;
  position: relative;
  text-align: center;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  width: 375px;
  margin: 0 auto;
}

.banner {
  height: 160px;
}
.main-title {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  h1,
  h4 {
    margin: 0 0 10px 0;
  }
  flex: 1;
  img {
    max-width: 70%;
  }
}

.hongbao {
  box-shadow: rgba($color: #000000, $alpha: 0.6) 0 0 10px;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 48px 48px 48px;
}
.hongbao-bg {
  background-size: 100%;
  background-position: top center;
}

.hongbao-top {
  padding: 32px 0;
  .title {
    font-size: 24px;
    color: #fff;
  }
}
.hongbao-middle {
  background-repeat: no-repeat;
  min-height: 65px;
  text-align: center;

  .take {
    width: 65px;
    height: 65px;
    background: #fff;
    line-height: 65px;
    text-align: center;
    margin: 0 8px;
    display: inline-block;
    border-radius: 35px;
    overflow: hidden;
    border: 1px dashed #f00;
    font-size: 24px;
    color: #f00;
    font-weight: bold;
    animation: shared 2s infinite ease;
  }
  .shared {
    width: 54px;
    height: 54px;
    background: #fff;
    line-height: 54px;
    text-align: center;
    margin: 0 8px;
    display: inline-block;
    border-radius: 30px;
    overflow: hidden;
    border: 1px dashed #f00;
    font-size: 24px;
    color: #f00;
    font-weight: bold;
  }
}

@keyframes shared {
  0% {
  }
  50% {
    transform: scale(1.1, 1.1);
    // transform: translate(0, -20px);
  }
  100% {
    //   transform: translate(0, -25px);
  }
}
.hongbao-bottom {
  padding: 16px;
  color: #f00;
  p {
    margin: 0 16px 16px 16px;
  }
  .btn {
    box-shadow: #ff0 0 2px 10px;
  }
  .remark {
    font-size: 12px;
    span {
      display: block;
    }
  }
}
</style>