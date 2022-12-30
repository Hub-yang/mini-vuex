import { computed, reactive } from "vue"
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
    // 保存actions
    _actions: options.actions,
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

  // 实现commit方法，后续通过bind绑定store上下文对其进行重新赋值，防止上下文错误
  function commit(type, payload) {
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
  }

  // 实现dispatch方法，后续通过bind绑定store上下文对其进行重新赋值，防止上下文错误
  function dispatch(type, payload) {
    // 匹配action
    const entry = this._actions[type]
    if (!entry) {
      console.error(`unknow action type:${entry}`)
      return
    }
    // 执行当前action，参数其实就是当前store实例
    // 另外注意：dispatch在处理一步操作时通常会返回一个promise，所以这里的结果也要返回给用户，加一个return
    return entry.apply(this, [this, payload])
  }

  // 写死上下文
  store.commit = commit.bind(store)
  store.dispatch = dispatch.bind(store)

  // 定义store.getters，这里不需要响应式，因为getters中函数依赖的state是响应式的
  store.getters = {}
  // 遍历用户传入的getters,动态设置store.getters.xxx为用户传入的getters函数的返回值:这里注意两点：依然遵循只读设置，其次，可以将结果借助computed实现缓存
  Object.keys(options.getters).forEach((key) => {
    // 借助computed奖结果返回
    const result = computed(() => {
      // 拿到匹配的getter
      const getter = options.getters[key]
      if (getter) {
        // 返回计算结果，也就是用户传入的getter的返回值
        return getter.call(store, store.state)
      } else {
        console.error(`unknow getter type ${key}`)
        return ""
      }
    })

    // 动态为store.getters赋值
    Object.defineProperty(store.getters, key, {
      // 只设置gette即为只读属性
      get() {
        return result
      },
    })
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
