<template>
  <h2>mini-pinia</h2>
  <h3>{{ counterStore.count }}-{{ counterStore.doubleCount }}</h3>
  <button @click="counterStore.count++">counterStore.count++</button>
  <button @click="counterStore.increment(888)">counterStore.increment()</button>
  <button @click="counterStore.$patch({ count: counterStore.count + 1 })">counterStore.$patch({})</button>
  <button @click="counterStore.$patch((state) => state.count++)">counterStore.$patch(() => {})</button>
</template>

<script setup>
import { useCounterStore } from "../piniaStore"

const counterStore = useCounterStore()
</script>
