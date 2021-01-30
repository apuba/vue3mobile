<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-29 18:44:18
 * @LastEditTime: 2021-01-31 05:01:30
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="body" :style="bgStyle">
    <Poster class="poster-position" id="hongbaoPoster" :activity="activity" />
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(url, index) in bannerList" :key="index">
          <img width="375" height="160" :src="url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main-title">
      <div class="txt" v-show="!isShared">
        <h1>{{ activity.sub }}</h1>
        <h4>{{ activity.subtitle }}</h4>
      </div>
      <div v-show="isShared">
        <img src="@public/images/yuan50.png" />
      </div>
    </div>
    <div class="hongbao-container">
      <div class="hongbao">
        <div class="hongbao-top hongbao-bg" :style="hongbaoTop">
          <van-swipe class="my-swipe" :autoplay="2500" :show-indicators="false">
            <van-swipe-item>
              <span class="title">单个1~50元</span>
            </van-swipe-item>
            <van-swipe-item>
              <span class="title">再邀{{ activity.invitationAmountHigh }}人，可拆1次</span>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="hongbao-bg" :style="hongbaoBottom">
          <div class="hongbao-middle hongbao-bg" :style="hongbaoMiddle">
            <span class="take" v-show="!isShared" @click="openHongbaoHandler">拆</span>
            <div v-show="isShared" v-if="activity.invitationAmountHigh">
              <span
                class="shared"
                v-for="i in activity.invitationAmountHigh"
                :key="i"
                @click="sharedHandler"
              >+</span>
            </div>
          </div>
          <div class="hongbao-bottom">
            <p v-show="!isShared">{{ activity.initMemberCount }}人领取了红包</p>
            <p v-show="isShared">
              <van-button
                type="danger"
                class="btn"
                block
                round
                v-if="activity.activityStatus===2"
              >分享给好友</van-button>
              <van-button
                type="default"
                class="btn"
                block
                round
                disabled
                v-if="activity.activityStatus===4"
              >红包已发完</van-button>
            </p>
            <div class="remark">
              <span>红包由 {{ enteInfo.corpName }} 提供</span>
              <span>“吸粉宝”技术支持</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-poster" @click="createPosterHandler" v-if="activity.activityStatus ===2">生成海报</div>
    <div class="btn-activityrule" @click="showActivityRule = true">规则</div>
    <van-overlay :show="showPoster" @click="showPoster = false">
      <div class="poster-page">
        <div class="poster-contain">
          <div>
            <div class="imgContainer"></div>
            <div class="remark-bottom" v-show="createPosterStatus === 1">海报生成中...</div>
            <div class="remark-bottom">长按海报可保存图片或分享到微信</div>
          </div>
        </div>
      </div>
    </van-overlay>

    <van-overlay :show="showActivityRule" @click="showActivityRule = false">
      <div class="poster-page">
        <div class="poster-contain">
          <div class="rule-content">
            <h2>活动规则</h2>
            <p>{{ activity.activityExplain}}</p>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts" src="./hongbao.ts">
</script>

<style lang="scss" scoped>
.poster-page {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
}

.poster-contain {
  width: 100vw;
}
.rule-content {
  background-color: rgb(255, 247, 211);
  margin: 0 48px;
  font-size: 14px;
  padding: 8px;
  text-align: left;
  h2 {
    text-align: center;
  }
}
.remark-bottom {
  text-align: center;
  color: #fff;
  padding-top: 8px;
}

.poster-position {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: -20000px;
}

.btn-activityrule {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 35px;
  background-color: rgba($color: #14cbc9, $alpha: 0.7);
  color: #fff;
  font-size: 13px;
  position: absolute;
  right: 85px;
  bottom: 10px;
  animation: shared 2.5s infinite ease-out;
}

.btn-poster {
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
  bottom: 25px;
  animation: shared 1s infinite ease-out;
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
  padding-top: 24px;
  position: relative;
  h1,
  h4 {
    margin: 0 0 10px 0;
  }

  img {
    max-width: 70%;
  }
}

.hongbao-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.hongbao {
  box-shadow: rgba($color: #000000, $alpha: 0.6) 0 0 10px;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 48px;
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
