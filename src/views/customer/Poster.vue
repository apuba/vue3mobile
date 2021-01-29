<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-30 00:58:23
 * @LastEditTime: 2021-01-30 02:40:35
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="page">
    <div class="contain">
      <div class="hongbao">
        <div class="hongbao-top hongbao-bg" :style="hongbaoTop">
          <div class="title">
            <h1 class="mb10">红包的主标题</h1>
            <h4>红包的可以长一点的副标题</h4>
          </div>
        </div>
        <div class="hongbao-bg" :style="hongbaoBottom">
          <div class="hongbao-middle hongbao-bg" :style="hongbaoMiddle">
            <span class="take">拆</span>
          </div>
          <div class="hongbao-bottom">
            <h4 class="mb10">王小刚领取</h4>
            <h1>单个1~50元</h1>
            <div class="qr">
              <img src="@public/images/qr.png" />
            </div>
            <div class="remark">
              <span> 已有xxx人领取 </span>
              <span>长按识别二维码，加微信领红包</span>
            </div>
          </div>
        </div>
      </div>
      <div class="remark-bottom">长按海报可保存图片或分享到微信</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {

    const state = reactive({


      hongbaoMiddle: {
        backgroundImage: 'url(' + require('@public/images/hongbaoMiddlePoster.jpg') + ')'
      },
      hongbaoBottom: {
        backgroundImage: ' url(' + require('@public/images/hongbaobgBottom.jpg') + ')'
      },

    })

    return { ...toRefs(state) }

  }
})
</script>

<style scoped lang="scss">
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
  box-shadow: rgba($color: #000000, $alpha: 0.6) 0 0 10px;
  border-radius: 20px;
  overflow: hidden;
  margin: 8px 48px;
  text-align: center;
}
.hongbao-bg {
  background-size: 100%;
  background-position: top center;
}

.hongbao-top {
  padding-top: 32px;
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
  }
  .qr {
    padding: 8px;
    display: inline-block;
    margin: 0 auto;
    // background-color: #fff;
    img {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}
</style>