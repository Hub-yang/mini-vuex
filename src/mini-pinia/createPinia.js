import { markRaw } from "vue"

export const piniaSymbol = Symbol("pinia")
export function createPinia() {
  const pinia = markRaw({
    // 实现install方法
    install(app) {
      pinia._a = app
      // 将pinia全局注入,以供所需组件使用
      app.provide(piniaSymbol, pinia)
      // 全局注册$pinia,供options api使用
      app.config.globalProperties.$pinia = pinia
    },
    // 创建一个数据结构，存储所有的store实例
    _s: new Map(),
  })

  return pinia
}
