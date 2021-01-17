<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-02 02:20:56
 * @LastEditTime: 2021-01-14 00:45:49
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div>
    <van-tabs
      v-model:active="activeName"
      color="#007aff"
      @click="queryActiveStatusHandler(activeName)"
    >
      <van-tab
        :title="item.title"
        :name="item.key"
        v-for="item in activeTab"
        :key="item.key"
      ></van-tab>
    </van-tabs>
    <div class="pt10">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div
          class="active-item"
          v-for="(item, index) in activeList"
          :key="index"
        >
          <div class="progres">
            <van-progress :percentage="50" />
          </div>
          <ul class="active-detail">
            <li>
              <span class="title">标题 </span>
              <span>{{ item.sub }}</span>
            </li>
            <li>
              <span class="title">金额</span>
              <span>{{ item.totalAmount }}元</span>
            </li>
            <li>
              <span class="title">时间</span>
              <span>{{ item.startTime }} 至 {{ item.endTime }}</span>
            </li>
          </ul>
          <div class="active-btn-list">
            <span class="active-btn">
              <span class="iconfont icon-ai23"></span>
            </span>
            <span class="active-btn">
              <span class="iconfont icon-xiangqing"></span>
            </span>
            <span class="active-btn">
              <span class="iconfont icon-shuju"></span>
            </span>
            <span class="active-btn active">
              <span class="iconfont icon-fenxiang"></span>
            </span>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { Tabs, Tab, Progress, PullRefresh } from "vant";
import { ServGetActivity } from "@/service/appService";
import { DTOActivity } from "@/service/appModel";
import { BaseRequestModel } from "@/service/baseModel";

export default defineComponent({
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Progress.name]: Progress,
    [PullRefresh.name]: PullRefresh,
  },
  setup() {
    const state = reactive({
      activeName: 0,
      activeTab: [
        { title: "全部", key: 0 },
        { title: "进行中", key: 1 },
        { title: "已结束", key: 2 },
      ],
      activeList: [] as Array<DTOActivity>,
    });

    const pagination = {
      pageIndex: 1,
      pageRows: 2,
    };

    const methods = {
      // 切换活动状态
      queryActiveStatusHandler: (status: number) => {
        const params = {
          activityStatus: status,
        };
        status ? getActivityData(params) : getActivityData();
      },
      onRefresh: () => {
        // 下拉刷新
        console.log(state.activeName);
      },
    };

    const getActivityData = async (params: object = {}) => {
      const query: BaseRequestModel = {
        params,
        pageIndex: pagination.pageIndex,
        pageRows: pagination.pageRows,
      };
      const res = await ServGetActivity(query);
      state.activeList = res.records;
    };

    onMounted(() => {
      getActivityData();
    });

    return { ...toRefs(state), ...toRefs(methods) };
  },
});
</script>

<style scoped lang="scss">
.progres {
  padding: 8px 0;
}
.active-btn {
  border: 1px solid #0dbadd;
  border-radius: 32px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  color: #0dbadd;
  text-align: center;
  display: inline-block;
  margin-right: 8px;
  &.active {
    background-color: #0dbadd;
    color: #fff;

    &:active {
      background-color: darken($color: #0dbadd, $amount: 3);
    }
  }
  &:active {
    background-color: #dff8fd;
  }
}
.active-item {
  border-radius: 8px;
  border: solid 1px #eeeeee;
  margin: 0 16px;
  padding: 16px;
  margin-bottom: 16px;
}
.active-detail {
  font-size: 14px;
  font-weight: bold;
  li {
    line-height: 32px;
  }
  .title {
    color: #666;
    display: inline-block;
    margin-right: 8px;
    font-weight: normal;
  }
}
</style>