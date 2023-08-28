<template>
  <h2>mini-vuex</h2>
  <p @click="$store.state = {}">test</p>
  <p @click="$store.commit('ADD')">count:{{ $store.state.count }}</p>
  <p @click="$store.dispatch('add')">async:{{ $store.state.count }}</p>
  <p>getters:{{ $store.getters.doubleCount }}</p>
</template>

<script setup></script>
