import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import store from "./vuexStore"
// import { createPinia } from "pinia"
// 引入手写createPinia
import { createPinia } from "./mini-pinia"

const app = createApp(App)

app.use(store).use(createPinia()).mount("#app")
