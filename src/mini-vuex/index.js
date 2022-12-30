import { reactive } from "vue"
// 实现createStore工厂
export function createStore(options) {
  // 创建store实例
  const store = {
    // 接收并保存用户传入的state，注意做响应式处理并且对state进行包装，使其不可直接更改
    // 包装方法1：直接在实例中使用getter/setter进行包装
    _state: reactive(options.state()),
    // get state() {
    //   return this._state
    // },
    // set state(value) {
    //   // 不允许直接设置state
    //   console.error("please use replaceState() to reset state")
    // },
    // 保存mutations
    _mutations: options.mutations,
    // 实现commit方法
    commit(type, payload) {
      // 保存上下文
      const state = this.state
      // 拿到options中mutations并匹配当前mutation
      const entry = this._mutations[type]
      if (!entry) {
        // 不存在报错
        console.error(`unknow mutation type:${entry}`)
        return
      }
      // 这里注意，用户在mutation中既可以使用state，也可以直接使用this，下面要注意将上下文的绑定在this.state
      entry.apply(state, [state, payload])
    },
  }

  // 包装方法2：使用Object.defineProperty()
  Object.defineProperty(store, "state", {
    get() {
      return store._state
    },
    set(value) {
      // 不允许直接设置state
      console.error("please use replaceState() to reset state")
    },
  })

  // 实现install方法
  store.install = function (app) {
    // 保存store
    const store = this
    // 全局注册$store变量
    app.config.globalProperties.$store = store
  }

  return store
}
