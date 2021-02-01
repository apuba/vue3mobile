<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-02-02 00:06:10
 * @LastEditTime: 2021-02-02 01:06:18
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="invitation-list">
    <div class="header">
      <div class="rank">排名</div>
      <div class="avatar">头像</div>
      <div class="name">用户名</div>
      <div class="total">邀请人数</div>
      <div class="hongbao">获取红包</div>
      <div class="amount">红包金额</div>
    </div>
    <div class="row">
      <div class="rank">1</div>
      <div class="avatar">
          <img src="http://wework.qpic.cn/bizmail/87jfwAOYR57aNGd9vKTOanl997suuaFs5YqYSzdicrfJWmEGvKejLDQ/0" />
      </div>
      <div class="name">用户名</div>
      <div class="total">邀请人数</div>
      <div class="hongbao">获取红包</div>
      <div class="amount">红包金额</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'invitationList',
  props: {
    dataList: []
  },
  setup() {

    return {}
  }
})
</script>

<style scoped lang="scss">
.invitation-list {
  padding: 16px;
  .header,
  .row {
    white-space: nowrap;
    & > div {
      display: inline-block;
    }
    text-align: center;
  }
  .header {
    line-height: 22px;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 4px;
    font-weight: bold;
  }
  .row {
    line-height: 40px;
  }

  .rank {
    min-width: 9%;
  }
  .avatar {
    min-width: 20%;
    img{
        width: 32px;
        height: 32px;
        border-radius: 16px;
        vertical-align: middle;
    }
  }
  .name {
    min-width: 20%;
  }
  .total {
    min-width: 17%;
  }
  .hongbao {
    min-width: 17%;
  }
  .amount {
    min-width: 17%;
  }
}
</style>