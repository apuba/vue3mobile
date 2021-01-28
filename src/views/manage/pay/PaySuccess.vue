<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-25 00:00:00
 * @LastEditTime: 2021-01-28 22:31:08
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="paysuccess">
    <div class="content">
      <div v-show="state.paysuccess === 'ok'">
        <img class="img" src="@public/images/paysuccess.jpg" />
        <p>您已完成支付<br />感谢您对我们的支持</p>
        <div class="btn">
          <van-button type="primary" plain block round to="/">
            我知道了
          </van-button>
        </div>
      </div>
      <div v-show="state.paysuccess === 'loading'">
        <img class="img loading" src="@public/images/loading.gif" />
        <p>订单状态查询中请稍等...</p>
      </div>
      <div v-show="state.paysuccess === 'normal'">
        <img class="img" src="@public/images/pay.jpg" />
        <p>等待支付...</p>
        <div class="btn">
          <van-button
            type="primary"
            plain
            round
            class="button"
            @click="queryOrderHandler"
          >
            我已支付
          </van-button>
          <van-button
            type="primary"
            round
            class="button"
            @click="payAgainHandler"
          >
            重新支付
          </van-button>
        </div>
      </div>

      <div v-show="state.paysuccess === 'fail'">
        <img class="img" src="@public/images/payfail.jpg" />
        <p>支付失败</p>
        <div class="btn">
          <van-button type="primary" plain class="button" round to="/">
            我知道了
          </van-button>
          <van-button
            type="primary"
            round
            class="button"
            @click="payAgainHandler"
          >
            重新支付
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, onMounted, reactive } from 'vue'
import { Button } from 'vant';
import { ServGetOrderHeader } from '@/service/appService';
import { mapState, useStore } from 'vuex'

export default defineComponent({
  components: {
    [Button.name]: Button
  },
  computed: {
    ...mapState(['payAgainUrl'])
  },
  setup() {
    const store = useStore();
    const state = reactive({
      paysuccess: 'normal',
      payurl: router.currentRoute.value.query.payurl as string || ''
    })
    const orderCode = router.currentRoute.value.query.orderCode as string || '';
    let queryNum = 0;
    // 查询订单状态
    const queryOrderHandler = () => {
      state.paysuccess = 'loading';
      queryNum = queryNum + 1;
      ServGetOrderHeader(orderCode).then(res => {
        // 如果订单返回不成功，需要重新查询 3次，第3次不管理什么结果都结束
        if (res.data && res.data.payStatus === 'PIAD') {
          state.paysuccess = 'ok';
        } else if (queryNum < 3) {
          setTimeout(() => {
            queryOrderHandler(); // 重新查询订单状态
          }, 1500)
        } else {
          state.paysuccess = 'fail';
        }
      })
    }
    // 重新支付
    const payAgainHandler = () => {
      debugger
      console.log(store.state.payAgainUrl)
      window.location.href = store.state.payAgainUrl;
    }
    return { state, queryOrderHandler, payAgainHandler }
  }
})
</script>

<style scoped lang="scss">
.paysuccess {
  text-align: center;
  font-size: 14px;
  display: flex;
  height: 100vh;
  align-items: center;
  color: #666;
  justify-content: center;
  line-height: 24px;
}
.img {
  max-width: 80%;
  margin: 0 auto;
  display: block;
}
.loading {
  max-width: 60%;
}
.btn {
  padding: 16px 15%;

  .button {
    margin: 0 10px;
    width: 40%;
  }
}
</style>