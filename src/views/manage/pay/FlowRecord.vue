<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-22 00:56:00
 * @LastEditTime: 2021-01-22 03:00:02
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="flowRecord">
    <van-nav-bar
      title="资金流水"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model:active="type" @click="changeTypeHandler">
      <van-tab title="充值记录"> </van-tab>
      <van-tab title="投放记录"></van-tab>
    </van-tabs>

    <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
      <van-cell
        v-for="(item, index) in dataList"
        :label="item.creationDate"
        :key="index"
        :title="item.remark"
        :value="(type === 0 ? '+' : ' - ') + item.amount"
      >
        <template #default>
          <div class="data-txt" :class="type === 0 ? 'green' : 'red'">
            <span v-if="type === 0"> +</span>
            <span v-if="type !== 0"> -</span>
            <span>{{ item.amount }}</span>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRaw, toRefs } from 'vue';
import { Tabs, Tab, List, NavBar, Cell } from 'vant';
import { ServFindCapitalFlow } from '@/service/appService';
import { BaseRequestModel } from '@/service/baseModel';
import router from '@/router';

interface IrecordModel {
  amount: number;
  creationDate: string;
  flowType: number;
  orderId: number;
  remark: string;
  activityId: number;
  flowId: number;

}
export default defineComponent({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell
  },
  setup() {
    let type = 0;
    if (router.currentRoute.value.query.type) {
      type = parseInt(router.currentRoute.value.query.type as string)
    }
    const refState = reactive({
      type,
      dataList: [] as Array<IrecordModel>,
      loading: false,
      finished: false
    })


    const state = {
      paging: {
        pageIndex: 1,
        pageRows: 20,
        total: 0
      }
    }

    // 获取数据列表
    const getDataList = (pageIndex: number) => {
      state.paging.pageIndex = pageIndex;
      const params: BaseRequestModel = {
        ...state.paging,
        params: {
          flowType: refState.type
        }
      }
      ServFindCapitalFlow(params).then(res => {

        if (refState.dataList.length) {
          refState.dataList = [...toRaw(refState.dataList), ...res.data.records];
        } else {
          refState.dataList = res.data.records;
        }
        refState.finished = true;
        state.paging.total = res.data.total
      })
    }

    const methods = {
      onClickLeft: () => {
        router.go(-1);
      },

      // 页面到底部再重新加载数据
      onLoad: () => {
        const pageIndex = state.paging.pageIndex === 1 ? 1 : state.paging.pageIndex + 1;
        getDataList(pageIndex);
      },
      changeTypeHandler: () => {
        refState.dataList = [];
        getDataList(1);
      }
    }


    return { ...methods, ...toRefs(refState) }
  }
})
</script>

<style scoped>
.data-txt {
  font-size: 18px;
  line-height: 40px;
}
.green {
  color: seagreen;
}
.red {
  color: tomato;
}
</style>