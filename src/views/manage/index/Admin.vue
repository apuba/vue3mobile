<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-02 02:01:45
 * @LastEditTime: 2021-01-02 02:19:07
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="admin-box">
    <div class="admin-list">
      <h4>管理员列表</h4>
      <ul class="photo">
        <li>
          <img src="@public/images/logo.jpg" />
        </li>
        <li>
          <img src="@public/images/logo.jpg" />
        </li>
        <li class="btn">
          <van-icon name="plus" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from 'vant';
export default defineComponent({
  components: {
    [Icon.name]: Icon
  },
  setup() {

    return {}
  }
})
</script>

<style lang="scss" scoped>
.admin-box {
  padding-top: 16px;
}
.admin-list {
  border: 1px solid #eee;
  margin: 0 16px;
  background-color: #f6f6f6;
  border-radius: 45px;
  height: 90px;
  text-align: center;
  h4 {
    margin: 10px 0;
    padding: 0;
  }
  .photo {
    margin: 0;

    li {
      display: inline-block;
      width: 36px;
      height: 36px;
      overflow: hidden;
      border-radius: 36px;
      border: 1px solid #ccc;
      margin: 0 4px;
      img {
        width: 100%;
        height: 100%;
      }
      &.btn {
          font-size: 24px;
          background-color: #fff;
          border-color: #0dbadd;
          .van-icon {
              line-height: 36px;
              color: #0dbadd;
          }
      }
    }
  }
}
</style>