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
  },
  {
    path: '/login',
    component: () => import('./../pages/loginIndex/index.vue'),
    redirect: '/account',
    children: [
      {
        path: '/account',
        component: () => import('../pages/loginIndex/components/phoneAccount.vue')
      },
      {
        path: '/pwd',
        component: () => import('../pages/loginIndex/components/phonePwd.vue')
      },
      {
        path: '/verify',
        component: () => import('../pages/loginIndex/components/phoneVerify.vue')
      }
    ]
  },
  {
    path: '/albumPage/:albumId/:name/:imgUrl',
    name: 'albumPage',
    component: () => import('../pages/albumPage.vue/index.vue')
  },
  {
    path: '/comments',
    component: () => import('../pages/commentsIndex/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
