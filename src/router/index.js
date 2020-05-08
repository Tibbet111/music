import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(err => err)
}

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
    path: '/playlist',
    component: () => import('../pages/recommend/index.vue'),
    redirect: '/recommend',
    children: [
      {
        path: '/quality',
        component: () => import('../pages/recommend/fine/index.vue')
      },
      {
        path: '/recommend',
        component: () => import('../pages/recommend/recommend/index.vue')
      },
      {
        path: '/general/:category',
        component: () => import('../pages/recommend/general/index.vue')
      }
    ]
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
  },
  {
    path: '/search',
    component: () => import('../pages/searchIndex/index.vue')
  },
  {
    name: 'searchResult',
    path: '/searchResult/:result',
    component: () => import('../pages/searchResult/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
