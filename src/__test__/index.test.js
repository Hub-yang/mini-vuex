import { reactive, computed } from "vue"
import { expect, test } from "vitest"

const state = {
  count: 0,
}

const getters = {
  doubleCount(state) {
    return state.count * 2
  },
}

// 处理getters
Object.keys(getters).forEach((key) => {
  getters[key] = getters[key].call(state, state)
})
test("111", () => {
  expect(getters).toBe("{ doubleCount: 0 }")
})
