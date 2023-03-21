import { reactive, computed, toRefs, getCurrentInstance, inject } from "vue"
import { piniaSymbol } from "./createPinia"

// 定义defineStore,接收用户传入的id和options
export function defineStore(id, options) {
  // 结构选项
  const { state: stateFn, getters, actions } = options
  // 获取state对象
  const state = reactive(stateFn())

  // 定义store函数并将其返回
  function useStore() {
    // 获取组件实例并注入pinia实例，以获取所需
    const currentInstance = getCurrentInstance()
    const pinia = currentInstance && inject(piniaSymbol)

    // 根据id获取store，没有则进行创建
    if (!pinia._s.has(id)) {
      pinia._s.set(
        id,
        reactive({
          // 将所有state属性展开到store，注意toRefs处理避免响应式丢失
          ...toRefs(state),

          // 封装getters：将所有getters封装为一个计算属性并将其返回
          // 这里使用reduce，处理完所有的getters得到一个对象，将其展开到store
          ...Object.keys(getters || {}).reduce((computedGetters, name) => {
            computedGetters[name] = computed(() => {
              return getters[name].call(store, store)
            })
            return computedGetters
          }, {}),

          // 封装actions中的所有函数，因为要指定上下文和做一些其他的事情
          ...Object.keys(actions || {}).reduce((wrapperActions, actionName) => {
            // 注意处理参数
            wrapperActions[actionName] = (...args) => {
              actions[actionName].apply(store, args)
            }
            return wrapperActions
          }, {}),
          $patch(partialtateOrMutator) {
            if (typeof partialtateOrMutator === "object") {
              Object.keys(partialtateOrMutator).forEach((key) => {
                state[key] = partialtateOrMutator[key]
              })
            } else {
              partialtateOrMutator(state)
            }
          },
        })
      )
    }
    const store = pinia._s.get(id)
    return store
  }

  return useStore
}
