<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-24 22:18:17
 * @LastEditTime: 2021-01-01 22:01:09
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <van-button color="#7232dd">单色按钮</van-button>
    <van-button color="#7232dd" plain>单色按钮</van-button>
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">
      渐变色按钮
    </van-button>
    <van-button type="info">信息按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Button } from 'vant';
//  import Vue from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    [Button.name]: Button

  },
});
</script>
