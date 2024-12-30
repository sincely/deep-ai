import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  mode: 'hash',
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/main',
      redirect: '/desktop',
      name: 'main',
      component: () => import('@/layouts/index.vue'),
      children: [
        {
          path: '/desktop',
          component: () => import('@/views/home/index.vue'),
          name: 'desktop',
          meta: {
            title: '主页',
            keepAlive: true
          }
        }
      ]
    }
  ]
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
