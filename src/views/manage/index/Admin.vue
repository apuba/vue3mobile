<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-02 02:01:45
 * @LastEditTime: 2021-02-01 00:31:18
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="admin-box">
    <div class="admin-list">
      <h4>管理员列表</h4>
      <ul class="photo">
        <!--  <li v-for="item in adminList" :key="item.id">
          <img :src="item.avatar" :title="item.name" />
        </li>
        -->
        <comp-avatar :data-list="adminList" @delHandler="delAdminHandler"></comp-avatar>
        <li v-show="isAddAdmin">
          <van-loading color="#1989fa" type="spinner" />
        </li>
        <li class="btn">
          <van-icon name="plus" @click="selectAdminList" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Icon, Toast, Loading } from "vant";
import { ServGetAdminList, ServAddAdminList, ServDelAdminList } from "@/service/appService";
import { IAvaterModel } from "@/service/appModel";
import CompAvatar from '@/views/components/CompAvatar.vue';
import _ from "lodash";

export default defineComponent({
  components: {
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    CompAvatar
  },
  setup() {
    const state = reactive({
      adminList: [] as Array<IAvaterModel>,
      isAddAdmin: false
    });

    ServGetAdminList().then((res) => {
      state.adminList = res;
    });

    const delAdminHandler = (userId: number) => {
      const params = [{ userId }];
      const admin = state.adminList.filter(item => item.id === userId);
      if (admin[0].isAdmin === 'Y') {
         Toast('超级管理员不可删除');
         return
      }     
      ServDelAdminList(params).then(res => {
        if (res.code === 200) {
          Toast('删除管理员成功')
          _.remove(state.adminList, item => item.id === userId);
        } else {
          Toast('删除管理员失败')
        }
      })
    }

    const selectAdminList = (type = 0) => {
      const selectedUserIds = state.adminList.map(item => item.id); // 已选择的成员

      window.wx.invoke("selectEnterpriseContact", {
        "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
        "mode": "multi",// 必填，选择模式，single表示单选，multi表示多选
        "type": ["department", "user"],// 必填，选择限制类型，指定department、user中的一个或者多个
        "selectedDepartmentIds": [],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
        "selectedUserIds": selectedUserIds // ["lisi", "lisi2"]// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
      }, function (res: any) {
        console.log('选择通信录成员成功------', res);
        if (res.err_msg == "selectEnterpriseContact:ok") {
          if (typeof res.result === 'string') {
            res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
          }

          const adminList: Array<IAvaterModel> = res.result.userList; // 获取当前用户链接
          const params = adminList.map((item) => {
            return {
              userid: item.id
            }
          })

          console.log('选择后结果', params)
          state.isAddAdmin = true;
          ServAddAdminList(params).then(res => {
            state.isAddAdmin = false;
            if (res.code === 200) {
              state.adminList = adminList; // 添加到用户列表
              Toast('添加应用管理员成功')
            } else {
              Toast('添加应用管理员失败')
            }
          })
        }
      });
    }
    return { ...toRefs(state), delAdminHandler, selectAdminList };
  },
});
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
      line-height: 36px;
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