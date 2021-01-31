/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-31 18:12:20
 * @LastEditTime: 2021-01-31 19:39:55
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { defineComponent, reactive, toRefs, onMounted, unref, toRaw } from "vue";
import { Tabs, Tab, Progress, PullRefresh, Toast } from "vant";
import { ServGetActivity, ServUpdateActivityStatus } from "@/service/appService";
import { DTOActivity, IUpdateActivityStatus } from "@/service/appModel";
import { BaseRequestModel } from "@/service/baseModel";
import ComScrollPage from '@/components/public/Com_Scroll_Page.vue';
import { mapState, mapMutations, useStore } from 'vuex';

interface IqueryParams {
  activityStatus?: number;
}

export default defineComponent({
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Progress.name]: Progress,
    [PullRefresh.name]: PullRefresh,
    ComScrollPage
  },
  computed: {
    ...mapState(['title', 'baseInfo'])
  },
  setup() {
    const store = useStore(); // 使用vuex
    const state = reactive({
      activeName: 0,
      inBottom: true, // 是否到底加载数据
      scrollReload: false, // 是否重载scroolPage组件
      activeTab: [
        { title: "全部", key: 0 },
        { title: "待发布", key: 1 },
        { title: "进行中", key: 2 },
        { title: "已暂停", key: 4 },
        { title: "已结束", key: 3 },
      ],
      activeList: [] as Array<DTOActivity>,
    });

    const pagination = {
      pageIndex: 1,
      pageRows: 5,
    };

    // 获取活动列表
    const getActivityData = async (params: IqueryParams = {}, inBottom?: boolean) => {

      if (inBottom) {
        pagination.pageIndex++
      }
      const query: BaseRequestModel = {
        params,
        pageIndex: pagination.pageIndex,
        pageRows: pagination.pageRows,
      };
      const res = await ServGetActivity(query);
      // state.activeList = res.records;

      if (inBottom) {
        state.activeList = [...toRaw(state.activeList), ...res.records];
        console.log(state.activeList)
      } else {
        state.activeList = res.records;
      }
      state.inBottom = true;
      !params.activityStatus && store.commit('setBaseInfo', { activityTotal: res.total })
    };

    const methods = {
      // calculation
      getComplete: (useNum: number, totalNum: number) => {
        return ((useNum / totalNum) * 100).toFixed(2);
      },
      // 切换活动状态
      queryActiveStatusHandler: (status: number) => {
        const params = {
          activityStatus: status,
        };
        state.activeList = [];
        pagination.pageIndex = 1; // 重置分页大小
        state.scrollReload = true;
        status ? getActivityData(params) : getActivityData();
      },
      onRefresh: () => {
        // 下拉刷新
        const params = {
          activityStatus: state.activeName,
        };
        state.activeName ? getActivityData(params, true) : getActivityData({}, true);
      },
      commitCurrentActivityHandler: (activity: any) => {
        // 保存当前活动到Vuex
        store.commit('setCurrentActivity', activity)
      },
      updateStatusHandler(activity: any, activityStatus: number) {
        const { activityId } = activity;
        debugger
        // 更新活动状态
        ServUpdateActivityStatus({ activityId, activityStatus }).then(res => {
          if (res.code === 200) {
            activity.activityId = activityStatus;
            switch (activityStatus) {
              case 2:
                activity.statusLabel = '进行中'
                break;
              case 3:
                activity.statusLabel = '已结束'
                break;
              case 4:
                activity.statusLabel = '已暂停'
                break;
            }
            Toast(`状态更新为：${activity.statusLabel}成功`)
          } else {
            Toast(`状态更新为：${activity.statusLabel}失败`)
          }
        })
      },

    };

    onMounted(() => {
      getActivityData();
    });

    return { ...toRefs(state), ...toRefs(methods) };
  },
});