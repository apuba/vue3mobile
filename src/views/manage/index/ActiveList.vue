<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-02 02:20:56
 * @LastEditTime: 2021-01-18 01:57:53
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div>
    <van-tabs v-model:active="activeName" color="#007aff">
      <van-tab
        :title="item.title"
        :name="item.key"
        v-for="item in activeTab"
        :key="item.key"
      ></van-tab>
    </van-tabs>
    <div class="pt10">
      <div class="active-item">
        <div class="progres">
          <van-progress :percentage="50" />
        </div>
        <ul class="active-detail">
          <li>
            <span class="title">活动标题</span>
            <span>粉丝活动福利红包来啦</span>
          </li>
          <li>
            <span class="title">活动金额</span>
            <span>5400.00元</span>
          </li>
          <li>
            <span class="title">活动时间</span>
            <span>2020-12-10 至 2020-12-11</span>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { Tabs, Tab, Progress } from "vant";
import { ServGetActivity } from "@/service/appService";
import { DTOActivity } from '@/service/appModel';
import { BaseRequestModel } from '@/service/baseModel';
import ComScrollPage from '@/components/public/Com_Scroll_Page.vue';

export default defineComponent({
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Progress.name]: Progress,
    ComScrollPage
  },
  setup() {
    const state = reactive({
      activeName: "all",
      activeTab: [
        { title: "全部", key: "all" },
        { title: "进行中", key: "underway" },
        { title: "已结束", key: "finished" }
      ],
      activeList: [] as Array<DTOActivity>
    });

    onMounted(() => {
      const params: BaseRequestModel = {
        params: {

        },
        pageIndex: 1,
        pageRows: 10
      };

      ServGetActivity(params);
    });

    return { ...toRefs(state) };
  }
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