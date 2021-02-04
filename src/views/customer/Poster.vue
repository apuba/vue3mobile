<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-30 00:58:23
 * @LastEditTime: 2021-02-04 02:52:50
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="poster">
    <div class="hongbao">
      <div class="hongbao-poster" :id="id">
        <div class="hongbao-top hongbao-bg" :style="hongbaoTop">
          <div class="title">
            <h1 class="mb10">{{ activity.sub }}</h1>
            <h4>{{ activity.subtitle }}</h4>
          </div>
        </div>
        <div class="hongbao-bg" :style="hongbaoBottom">
          <div class="hongbao-middle hongbao-bg" :style="hongbaoMiddle">
            <span class="take">
              <img :src="activity.headUrl"  />
            </span>
          </div>
          <div class="hongbao-bottom">
            <h4 class="mb10 userName">{{ userInfo.name }}已领取</h4>
            <h1>单个1~50元</h1>
            <div class="qr">
              <!-- <img :src="activity.qrCode" v-show="activity.isUndertaker" /> -->
              <div id="qr"></div>
            </div>
            <div class="remark">
              <span>{{ activity.initMemberCount }}人领取了红包</span>
              <span>长按识别二维码，加微信领红包</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex';
import { qrcanvas } from 'qrcanvas'; // 二维码

export default defineComponent({
  components: {
    // QRCanvas
  },
  props: {
    id: {
      type: String,
      default: 'poster'
    },
    activity: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const refState = reactive({
      hongbaoMiddle: {
        backgroundImage: 'url(' + require('@public/images/hongbaoMiddlePoster.jpg') + ')'
      },
      hongbaoBottom: {
        backgroundImage: ' url(' + require('@public/images/hongbaobgBottom.jpg') + ')'
      },
      userInfo: { ...store.state.userInfo }
    })

    watch(() => props.activity.qrCodeContent, (nval, oval) => {
      // if (!nval || props.activity.isUndertaker) return;
      if (!nval) return;
      const qr = qrcanvas({
        data: nval || '红包生成中',
        size: 120, // 二维码大小
      })
      const ele = document.querySelector('#qr') as HTMLDivElement
      ele.appendChild(qr);
    })
    onMounted(() => {

    })

    return { ...toRefs(refState) }
  }
})
</script>

<style scoped lang="scss">
.poster {
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
    background: #f00;
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
      border: 1px dashed #f00;
      font-size: 24px;
      color: #f00;
      font-weight: bold;
      img {
        width: 65px;
        height: 65px;
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
    }
    .qr {
      padding: 8px;
      display: inline-block;
      margin: 0 auto;
      width: 128px;
      height: 128px;
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
  #qr {
    padding: 4px;
    background-color: #fff;
    height: 120px;
    width: 120px;
  }
}
</style>