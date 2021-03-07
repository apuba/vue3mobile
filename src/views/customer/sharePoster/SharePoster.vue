<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-02-03 20:58:25
 * @LastEditTime: 2021-03-06 15:36:18
 * @LastEditors: 3603317@qq.com
 * @Description: 
-->

<template>
  <div>
    <div class="page">
      <div class="contain">
        <!-- <Poster id="hongbaoPoster" :activity="activity" /> -->
        <div class="hongbao">
          <div class="hongbao-poster">
            <div class="hongbao-top hongbao-bg" :style="hongbaoTop">
              <div class="title">
                <h1 class="mb10">{{ activity.sub }}</h1>
                <h4>{{ activity.subtitle }}</h4>
              </div>
            </div>
            <div class="hongbao-bg" :style="hongbaoBottom">
              <div class="hongbao-middle hongbao-bg" :style="hongbaoMiddle">
                <span class="take" v-show="enteInfo.corpSquareLogoUrl">
                  <img :src="enteInfo.corpSquareLogoUrl" />
                </span>
              </div>
              <div class="hongbao-bottom">
                <div class="remark">
                  <span>{{ activity.initMemberCount }}人领取了红包</span>
                </div>
                <h1>单个1~50元</h1>
                <div class="qr">
                  <span v-show="!activity.qrCode">二维码生成中...</span>
                  <img :src="activity.qrCode" v-show="activity.qrCode" />
                </div>
                <div class="remark">
                  <span class="txt">长按识别二维码</span>
                  <span class="txt">添加红包派发员微信</span>
                </div>
                <div class="enteInfo">红包由{{ enteInfo.corpName }}提供</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./sharePoster.ts">
</script>

<style scoped lang="scss">
.enteInfo {
  padding: 16px 0;
}
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  background: #333;
}
.contain {
  width: 100vw;
}

h1,
h4 {
  margin: 0;
}
.mb10 {
  margin-bottom: 10px;
}
.remark-bottom {
  color: #fff;
  font-size: 14px;
}
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
}
.contain {
  width: 100vw;
}
.hongbao {
 box-shadow: #333 0 0 5px;
  border-radius: 20px;
  overflow: hidden;
  margin: 8px 48px;
  text-align: center;
  background: #f00;
  animation: bganimat 2s infinite ease;
}
.hongbao-bg {
  background-size: 100%;
  background-position: top center;
}

.hongbao-top {
  padding-top: 32px;
  padding-bottom: 4px;
  background-color: #f00;
  .title {
    color: #ff0;
  }
}
.hongbao-middle {
  background-repeat: no-repeat;

  min-height: 65px;
  text-align: center;
  padding-top: 30px;
  .take {
    width: 65px;
    height: 65px;
    line-height: 65px;
    text-align: center;
    margin: 0 8px;
    display: inline-block;
    border-radius: 35px;
    overflow: hidden;
    border: 2px dotted #f00;
    font-size: 24px;
    color: #f00;
    font-weight: bold;
    background: #fff;
    img {
      max-width: 65px;
      max-height: 65px;
    }
  }
}

.hongbao-bottom {
  padding-bottom: 16px;
  color: #333;
  p {
    margin: 0 16px 16px 16px;
  }
  h1 {
    color: #f00;
  }

  .remark {
    font-size: 13px;
    span {
      display: block;
      line-height: 24px;
    }
    .txt {
      font-size: 18px;
      font-weight: bold;
      // color: #f00;
    }
  }
  .qr {
    padding: 8px;
    display: inline-block;
    margin: 0 auto;
    width: 140px;
    line-height: 140px;
    background-size: contain;
    // background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.userName {
  font-weight: normal;
}

@keyframes bganimat {
  0% {
  }

  50% {
    // transform: scale(1.1, 1.1);
    // transform: translate(0, -20px);
    box-shadow: #ff0 0 0 10px;
  }

  100% {
    //   transform: translate(0, -25px);
  }
}
</style>