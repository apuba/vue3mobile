/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-31 18:12:20
 * @LastEditTime: 2021-02-02 02:30:43
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { defineComponent, reactive, toRefs, onMounted, unref, toRaw } from "vue";
import { Tabs, Tab, Progress, PullRefresh, Toast } from "vant";
import { ServGetActivity, ServUpdateActivityStatus, ServgetCountByStatus } from "@/service/appService";
import { DTOActivity, ITabs, IUpdateActivityStatus } from "@/service/appModel";
import { BaseRequestModel } from "@/service/baseModel";
import ComScrollPage from '@/components/public/Com_Scroll_Page.vue';
import { mapState, mapMutations, useStore } from 'vuex';
import _ from "lodash";

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
        { title: "全部", key: 0, badge: '' },
        // { title: "待发布", key: 1, badge: '' },
        { title: "进行中", key: 2, badge: '' },
        { title: "已暂停", key: 4, badge: '' },
        { title: "已结束", key: 3, badge: '' },
      ] as Array<ITabs>,
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

        // 更新活动状态
        ServUpdateActivityStatus({ activityId, activityStatus }).then(res => {
          if (res.code === 200) {
            activity.activityStatus = activityStatus;
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
            _.remove(state.activeList, item => item.activityId === activityId); // 把当前数据从数组中移除
            Toast(`状态更新为：${activity.statusLabel}成功`)
            getActivityTotalData();

          } else {
            Toast(`状态更新为：${activity.statusLabel}失败`)
          }
        })
      },
    };


    const getActivityTotalData = () => {
      // 活动状态统计
      ServgetCountByStatus().then(res => {
        if (res.data) {
          state.activeTab.map(data => {
            let tab = _.find(res.data, item => item.activityStatus === data.key);
            tab ? data.badge = tab.counts : data.badge = '';
          })
        }
      })
    }

    onMounted(() => {
      getActivityData();
      getActivityTotalData();
    });

    return { ...toRefs(state), ...toRefs(methods) };
  },
});