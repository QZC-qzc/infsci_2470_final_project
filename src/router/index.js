import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: { notNeedAuth: true },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/404',
    name: 'NotFund',
    hidden: true,
    meta: { notNeedAuth: true },
    component: () => import('@/views/Error/404.vue')
  }
]
export const permissionRoutes = [
  {
    path: '/',
    redirect: '/index/list',
    hidden: true
  },
  {
    path: '/home',
    name: 'home page',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'home-index',
        meta: { title: 'Home Page', icon: 'el-icon-s-help' },
        component: () => import('@/views/home.vue')
      }
    ]
  },
  {
    path: '/add',
    name: 'add',
    redirect: '/add/add',
    component: Layout,
    children: [
      {
        path: 'add',
        name: 'add-add',
        meta: { title: 'Create a New Meeting', icon: 'el-icon-circle-plus' },
        component: () => import('@/views/system/add.vue')
      }
    ]
  },
  {
    path: '/userInfo',
    name: 'User Info',
    redirect: '/userInfo/index',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'userInfo-index',
        meta: { title: 'User Info', icon: 'el-icon-circle-plus' },
        component: () => import('@/views/user/userInfo.vue')
      }
    ]
  },
  {
    path: '/index',
    name: 'participation list',
    redirect: '/index/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'index-list',
        meta: { title: 'Meeting List', icon: 'el-icon-s-grid' },
        component: () => import('@/views/system/index.vue')
      }
    ]
  },

  {
    path: '/detail',
    name: 'detail',
    hidden: true,
    redirect: '/detail/detail',
    meta: { title: 'detail', icon: 'el-icon-s-grid' },
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'detail-detail',
        meta: { title: 'Detail', icon: 'el-icon-s-grid' },
        component: () => import('@/views/system/detail.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user management',
    redirect: '/user/list',
    component: Layout,
    meta: { auth: 'admin' },
    children: [
      {
        path: 'list',
        name: 'user-list',
        meta: { title: 'User Management', icon: 'el-icon-user-solid', auth: 'admin' },
        component: () => import('@/views/user/index.vue')
      }
    ]
  },
  {
    path: '/collection',
    name: 'Collection Management',
    redirect: '/collection/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'collection-list',
        meta: { title: 'Favorites Management', icon: 'el-icon-s-goods' },
        component: () => import('@/views/collection/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'Error',
    hidden: true,
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export function resetRouter() {
  const newRouter = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
  router.matcher = newRouter.matcher
}

router.beforeEach((to, from, next) => {
  const whiteList = ['Login', 'NotFund']

  if (!store.getters.userInfo.userId && whiteList.indexOf(to.name) === -1) {
    next({ name: 'Login' })
  } else if (to.meta.auth === 'admin' && store.getters.userInfo.type == 2) {
    next({ name: 'NotFund' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (to.name && to.meta.needCache) {
    store.commit('tagsView/ADD_CACHE_VIEW', to.name)
  }

  if (to.meta === undefined || to.meta.notNeedAuth) {
    return
  }

  if (to.meta.fixed) {
    store.dispatch('tagsView/addFixedVisitedView', {
      name: to.name,
      fullPath: to.fullPath,
      meta: to.meta
    })
  } else {
    store.commit('tagsView/ADD_VISITED_VIEW', {
      name: to.name,
      fullPath: to.fullPath,
      meta: to.meta
    })
  }
})

export default router
