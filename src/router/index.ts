/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-24 22:18:17
 * @LastEditTime: 2021-02-02 00:04:28
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { ROUTER_MODEL } from '@/config/index'
import storage from '@/common/storage';
import { ROUTER_WIHITELIST } from '@/config';

// 路由模式
const historyModel = {
  hash: createWebHashHistory,
  history: createWebHistory
}

const routeHistory = historyModel[ROUTER_MODEL];


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // redirect: '/index'
    component: () => import('../views/manage/index/Index.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/manage/index/Index.vue')
  },
  {
    path: '/intro',
    name: 'intro',
    component: () => import('../views/manage/newActive/Intro.vue')
  },
  {
    path: '/createActive',
    name: 'createActive',
    component: () => import('../views/manage/newActive/CreateActive.vue')
  },
  {
    path: '/activityDetail',
    name: 'activityDetail',
    component: () => import('../views/manage/activityDetail/ActivityDetail.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/manage/pay/Pay.vue')
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () => import('../views/manage/pay/PaySuccess.vue')
  },
  {
    path: '/FlowRecord',
    name: 'flowRecord',
    component: () => import('../views/manage/pay/FlowRecord.vue')
  },
  // { path: '*', component: NotFoundComponent }
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },

  {
    path: '/customer',
    name: 'customer',
    redirect: '/customer/hongbao',
    component: () => import('../views/customer/Index.vue'),
    children: [
      {
        path: 'poster',
        name: 'poster',
        component: () => import('../views/customer/Poster.vue')
      },
      {
        path: 'hongbao',
        name: 'hongbaoIndex',
        component: () => import('../views/customer/hongbao/Hongbao.vue')
      }
    ]
  }
 
  
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: routeHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
  const token = storage().get('token') || storage('localstorage').get('token');
  // 判断是否登录
  if (token) {
    next();
  } else {
    if (ROUTER_WIHITELIST.includes(to.path)) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
})
export default router
