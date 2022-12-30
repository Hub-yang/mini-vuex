import { createStore } from "../mini-vuex"
// 创建store实例
const store = createStore({
  state() {
    return {
      count: 0,
    }
  },
  mutations: {
    ADD(state) {
      state.count++
      // this.count++
    },
  },
  actions: {
    add({ commit, state, dispatch }) {
      setTimeout(() => {
        commit("ADD")
      }, 1000)
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
})

export default store
