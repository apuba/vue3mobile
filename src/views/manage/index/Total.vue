<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-01 21:22:40
 * @LastEditTime: 2021-01-22 02:15:49
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="total">
    <van-row>
      <van-col span="12">
        <div class="total-item balance">
          <div class="name">余额（元）</div>
          <div class="count">58000.00</div>
          <div class="btn">
            <van-row gutter="8">
              <van-col span="12">
                <van-button type="primary" size="small " round block to="/pay">充值</van-button>
                 
              </van-col>
              <van-col span="12">
                <van-button type="default" plain size="small " block round to="/flowRecord?type=1">明细</van-button>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-col>
      <van-col span="12">
        <div class="total-item">
          <div class="name">活动总数</div>
          <div class="count">20</div>
          <div class="btn">
            <van-button type="primary" size="small " round block to="/intro">创建活动</van-button
            >
          </div>
        </div>
      </van-col>
    </van-row>
     
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Col, Row } from 'vant';
import { Button } from 'vant';
// import 'vant/lib/Col/style/less';
export default defineComponent({
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button
  },
  setup() {


    return {}
  }
})
</script>

<style lang="scss" scoped>
.total {
  margin-top: 30px;
  text-align: center;
}
.balance {
  border-right: 1px solid #eee;
}
.total-item {
  .btn {
    padding: 0 24px;
  }

  .name {
    color: #666;
  }
  .count {
    color: #333;
    font-size: 24px;
    line-height: 45px;
  }
}
</style>