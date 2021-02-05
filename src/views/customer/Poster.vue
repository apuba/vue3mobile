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
          <div class="hongbao-middle hongbao-bg">
            <div class="photo">
              <span class="take" v-if="activity.headUrl">
                <img :src="activity.headUrl" />
              </span>
            </div>
            <img src="@public/images/hongbaoMiddlePoster.jpg" />
          </div>
          <div class="hongbao-bottom">
            <h4 class="mb10 userName">{{ userInfo.name }}已领取</h4>
            <h1>单个1~50元</h1>
            <div class="qr">            
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
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { qrcanvas } from "qrcanvas"; // 二维码

export default defineComponent({
  components: {
    // QRCanvas
  },
  props: {
    id: {
      type: String,
      default: "poster",
    },
    activity: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const refState = reactive({
      hongbaoMiddle: {
        backgroundImage:
          "url(" + require("@public/images/hongbaoMiddlePoster.jpg") + ")",
      },
      hongbaoBottom: {
        backgroundImage:
          " url(" + require("@public/images/hongbaobgBottom.jpg") + ")",
      },
      userInfo: { ...store.state.userInfo },
    });

    watch(
      () => props.activity.qrCodeContent,
      (nval, oval) => {       
        if (!nval) return;
        const qr = qrcanvas({
          data: nval || "红包生成中",
        });

        const newImage = new Image();
        newImage.width = 120;
        newImage.height = 120;
        newImage.style.border = "4px solid #fff";
        newImage.src = qr.toDataURL("image/png");
        newImage.style.margin = "4px";
        const ele = document.querySelector("#qr") as HTMLDivElement;
        ele.appendChild(newImage);
      }
    );
    onMounted(() => {});

    return { ...toRefs(refState) };
  },
});
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
    h1 {
      font-size: 32px;
    }
  }
  .hongbao-middle {
    position: relative;
    background-repeat: no-repeat;
    & > img {
      width: 100%;
    }
    .photo {
      position: absolute;
      top: 30px;
      left: 50%;    
      margin-left: -32px;
    }
    .take {
      z-index: 1;
      width: 65px;
      height: 65px;
      line-height: 65px;
      text-align: center;
  
      display: inline-block;
      border-radius: 35px;
      overflow: hidden;
      border: 1px dashed #f00;
      font-size: 24px;
      color: #f00;
      font-weight: bold;
      img {
        max-width: 100%;
        max-height: 100%;
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
      // padding: 8px;
      display: inline-block;
      margin: 0 auto;

      background-size: contain;
      // background-color: #fff;
    }
  }
  .userName {
    font-weight: normal;
  }
}
</style>