/// <reference types="vitest" />
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 3015,
    open: true,
  },
  // 单元测试
  test: {},
})
