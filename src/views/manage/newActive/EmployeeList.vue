<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-10 17:01:09
 * @LastEditTime: 2021-01-20 21:15:31
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div class="employee">
    <div class="employee-list">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="getCheckedHandler($event, item)"
        >
          <img :src="item.avatar" class="img" ref="" />
          <span class="name">{{ item.name }}</span>
          <van-checkbox v-model="item.checked" class="checked" />
        </li>
      </ul>

      <div class="btn">
        <van-button type="primary" block round>确定</van-button>
      </div>
    </div>
    <div class="checked-list">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <img
            :src="item.avatar"
            v-if="item.checked"
            class="img"
            @click="item.checked = !item.checked"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" src="./EmployeeList.ts">
</script>

<style scoped lang="scss">
.btn {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  padding: 0 8px;
}
.img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 8px;
  border-radius: 4px;
  display: inline-block;
}
.checked {
  float: right;
  vertical-align: middle;
  height: 40px;
  line-height: 40px;
}

.employee {
  display: flex;
}
.checked-list {
  // margin-left: 70%;
  width: 70px;
  text-align: center;
  li {
    margin-top: 8px;
  }
  /*  img {
    width: 40px;
    height: 40px;
    border-radius: 30px;
    border: 1px solid #eee;
  } */
}
.employee-list {
  position: relative;
  flex: 1;
  border-right: 1px solid #eee;
  display: block;
  height: 100vh;
  ul {
    padding: 16px;
    margin: 0;
  }
  li {
    height: 40px;
    line-height: 40px;
    font-size: 16px;

    .name {
      display: inline-block;
      vertical-align: middle;
      max-width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>