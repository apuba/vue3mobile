import { createStore } from 'vuex'

export default createStore({
  state: {
    title: '测试红包系统',
    token: 'asdasdasdasdasdasdasdasd'
  },
  mutations: {
    setTitle(state, payload) {
      state.title = payload
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
