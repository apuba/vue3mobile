/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-13 20:16:41
 * @LastEditTime: 2021-01-25 23:10:54
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    title: '测试红包系统',
    token: 'asdasdasdasdasdasdasdasd',
    baseInfo: {
      activityTotal:0,
      balance: 0
    }
  },
  mutations: {
    setTitle(state, payload) {
      state.title = payload
    },
    setBaseInfo(state, payload: any) {
      state.baseInfo = {
        ...state.baseInfo,
        ...payload
      }
    }
  },
  getters: {
    getTitle (state, payload) {
      return state.title;
    }
  },
  actions: {
  },
  modules: {
  }
})
