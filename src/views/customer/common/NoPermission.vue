<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-23 13:19:55
 * @LastEditTime: 2021-03-23 17:40:17
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="paysuccess">
    <div class="content">
      <div>
        <img class="img" src="@public/images/cry.jpg" />
        <h2>无法加入活动，具体原因请参考</h2>
        <ol v-if="errorTip">          
          <li>{{ errorTip }}</li>
        </ol>
        <ol v-else>
          <li>活动设置了指定区域的人群可参加</li>
          <li>活动设置了指定性别可参加</li>
          <li>活动已结束或暂停中</li>
        </ol>
        <div class="btn">
          <van-button type="primary" plain block round>我知道了</van-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Button } from 'vant';
import router from "@/router";

export default {
  components: {
    [Button.name]: Button
  },
  setup () {
    const errorTip = (router.currentRoute.value.query.error) || "";
    return { errorTip }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: #0dbadd;
}
ol {
  list-style: inside;
}
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
  max-width: 45%;
  margin: 8px auto;
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