import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../pages/nav/index.vue'),
    redirect: '/find',
    children: [
      {
        path: '/find',
        component: () => import('../pages/findIndex/index.vue')
      },
      {
        path: '/my',
        component: () => import('../pages/homeIndex/index.vue')
      },
      {
        path: '/friend',
        component: () => import('../pages/friendIndex/index.vue')
      },
      {
        path: '/video',
        component: () => import('../pages/videoIndex/index.vue')
      }
    ]
  },
  {
    path: '/dateRecommend',
    component: () => import('../pages/dateRecommend/index.vue')
  },
  {
    path: '/recommend',
    component: () => import('../pages/recommend/index.vue')
  },
  {
    path: '/dj',
    component: () => import('../pages/radio/index.vue')
  },
  {
    path: '/idx',
    component: () => import('../pages/idx/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
