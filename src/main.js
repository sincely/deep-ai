import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router' // 路由
import '@/styles/index.less' // 全局样式
import { setupIcon } from './plugins' // 全局注册antd图标

async function setupApp() {
  const app = createApp(App)
  setupIcon(app)
  app.use(store)
  app.use(router)
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
  app.config.performance = true
}

setupApp()
