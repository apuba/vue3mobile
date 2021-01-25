<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-25 00:00:00
 * @LastEditTime: 2021-01-25 22:27:31
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="paysuccess">
    <div class="content">
      <div v-show="state.paysuccess === 'ok'">
        <img class="img" src="@public/images/paysuccess.jpg" />
        <p>您已完成支付<br />感谢您对我们的支持</p>
      </div>
      <div v-show="state.paysuccess === 'loading'">
        <img class="img" src="@public/images/loading.gif" />
        <p>订单状态查询中请稍等...</p>
      </div>

      <div v-show="state.paysuccess === 'fail'">
        <img class="img" src="@public/images/payfail.jpg" />
        <p>支付失败</p>
      </div>

      <div class="btn"  v-show="state.paysuccess !== 'loading'">
        <van-button type="primary" plain block round to="/">
          我知道了
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, reactive } from 'vue'
import { Button } from 'vant';
import { ServGetOrderHeader } from '@/service/appService';

export default defineComponent({
  components: {
    [Button.name]: Button
  },
  setup() {
    const state = reactive({
      paysuccess: 'loading'
    })

    const orderCode = router.currentRoute.value.query.orderCode as string || '';

    ServGetOrderHeader(orderCode).then(res => {
      if (res.data) {
        state.paysuccess = res.data.payStatus === 'PIAD' ? 'ok' : 'fail';
      } else {
        state.paysuccess = 'fail';
      }
    })

    return { state }
  }
})
</script>

<style scoped>
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
  max-width: 90%;
  margin: 0 auto;
  display: block;
}
.btn {
  padding: 16px 15%;
}
</style>