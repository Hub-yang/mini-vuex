<template>
  <h2>mini-vuex</h2>
  <p @click="$store.state = {}">test</p>
  <p @click="$store.commit('ADD')">count:{{ $store.state.count }}</p>
  <p @click="$store.dispatch('add')">async:{{ $store.state.count }}</p>
  <p>getters:{{ $store.getters.doubleCount }}</p>


  <Pinia.BasePiniaOne />
  <Pinia.BasePiniaTwo />
</template>

<script setup>
import * as Pinia from "./components/components"

import { useCounterStore } from "./piniaStore"

const one = useCounterStore()
const two = useCounterStore()
// 验证store的单例
console.log(one === two)
</script>
