import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router' // 路由
import '@/styles/index.scss' // 全局样式
import { setupIcon } from './plugins' // 全局注册antd图标
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
async function setupApp() {
  const app = createApp(App)
  setupIcon(app)
  app.use(store)
  app.use(router)
  // 将 ElementPlus 和路由器挂载到应用实例
  app.use(ElementPlus)
  app.config.globalProperties.$message = ElMessage
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
  app.config.performance = true
}

setupApp()
