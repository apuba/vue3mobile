<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-21 21:25:26
 * @LastEditTime: 2021-01-22 03:04:35
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="body">
    <van-nav-bar
      title="充值"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="header">
      <div class="main">
        <span class="title">账户余额</span>
        <div class="txt">
          <span class="record" @click="goto()"> 充值记录 &gt; </span>

          <span class="price">￥50000.00</span>
        </div>
      </div>
      <div class="main-bottom1"></div>
      <div class="main-bottom2"></div>
    </div>
    <ul class="price-list">
      <li
        v-for="(price, index) in priceList"
        :key="index"
        @click="choosePriceHandler(price)"
      >
        <span :class="{ active: price === choosePrice }">￥{{ price }}</span>
      </li>
    </ul>

    <div class="remark">
      <span class="title">充值须知：</span>
      <div class="content">
        <span>1、充值免收手续费；</span><br />
        <span>2、充值后不支持提现</span>
      </div>
    </div>
    <div class="btn">
      <van-button block type="primary" round @click="createOrderHandler"
        >充值{{ choosePrice }} 元</van-button
      >
    </div>
  </div>
</template>

<script lang="ts" src="./Pay.ts">
</script>

<style scoped lang="scss">
.body {
  background-color: #f5f5f5;
  height: 100vh;
  // z-index: -2;
  position: relative;
  color: #333;
}
.header {
  z-index: 10;
  padding: 16px;
  font-size: 14px;
  color: #fff;
  position: relative;
  .main {
    margin-top: 8px;
    background-image: linear-gradient(-270deg, #20e1af 0%, #0dbadd 100%);
    padding: 24px 16px;
    border-radius: 24px;
    .txt {
      line-height: 40px;
      margin-top: 16px;
    }
    .price {
      font-size: 36px;
      // font-weight: 600;
    }
    .title {
      margin-left: 8px;
    }
    .record {
      // display: inline-block;
      float: right;
      margin-right: 8px;
      // font-size: 16px;
    }
  }
  .main-bottom1 {
    background: #59d2f0;
    height: 10px;
    width: 85%;
    margin: 0 auto;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .main-bottom2 {
    background: #d8f1f8;
    height: 10px;
    width: 75%;
    margin: 0 auto;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }
}
.body::after {
  width: 120%;
  height: 160px;
  position: fixed;
  left: -10%;
  top: 0;
  // z-index: -1;
  content: "";
  border-radius: 0 0 50% 50%;
  // background-image: linear-gradient(-270deg, #2af598 0%, #009efd 100%);
  background: #009abb;
}
.price-list {
  padding: 8px;
  li {
    display: inline-block;
    width: 33%;
    margin-bottom: 16px;
    span {
      display: block;
      height: 40px;
      line-height: 40px;
      border-radius: 24px;
      background: #fff;
      border: 1px solid #eee;
      text-align: center;
      font-size: 18px;
      color: #333;
      margin: 0 6px;
      &.active {
        border-color: #0dbadd;
        color: #0dbadd;
        box-shadow: #7ddff3 0 3px 8px;
      }
    }
  }
}
.remark {
  padding: 0 16px 16px 16px;
  .title {
    font-size: 16px;
    // font-weight: bold;
    line-height: 40px;
  }
  .content {
    padding: 16px;
    background: #fff;
    border: 1px solid #eee;
    font-size: 14px;
    border-radius: 16px;
    line-height: 24px;
  }
}
.btn {
  padding: 8px 16px;
}
</style>