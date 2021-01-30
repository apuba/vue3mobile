/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-13 20:16:41
 * @LastEditTime: 2021-01-31 03:08:15
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    title: '测试红包系统',
    token: 'asdasdasdasdasdasdasdasd',
    baseInfo: {
      activityTotal: 0,
      balance: 1999
    },
    enteInfo: {
    },
    userInfo: {},
    payAgainUrl: '',
    currentActivity: {}, // 当前查询的活动
  },
  mutations: {
    setCurrentActivity(state, payload) {
      state.currentActivity = payload
    },
    setPayAgainUrl(state, payload: string) {
      state.payAgainUrl = payload;
    },
    setTitle(state, payload) {
      state.title = payload
    },
    setBaseInfo(state, payload: any) {
      state.baseInfo = {
        ...state.baseInfo,
        ...payload
      }
    },
    setEnteInfo(state, payload: any) {
      state.enteInfo = {
        ...state.enteInfo,
        ...payload
      }
    },
    setUserInfo(state, payload: any) {
      state.userInfo = {
        ...state.userInfo,
        ...payload
      }
    }
  },
  getters: {
    getTitle(state, payload) {
      return state.title;
    },
    getCurrentActivity(state) {
      return state.currentActivity
    }
  },
  actions: {
  },
  modules: {
  }
})
