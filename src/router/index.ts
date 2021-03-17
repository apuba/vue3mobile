/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-24 22:18:17
 * @LastEditTime: 2021-03-12 00:28:13
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { ROUTER_MODEL } from '@/config/index'
import storage from '@/common/storage';
import { ROUTER_WIHITELIST } from '@/config';
import { getURLParams } from '@/common/helper/tools';
import { useStore } from 'vuex'

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
    component: () => import('../views/manage/index/Index.vue')
  },
  {
    path: '/about',
    name: 'About',
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
        path: 'sharePoster',
        name: 'sharePoster',
        component: () => import('../views/customer/sharePoster/SharePoster.vue')
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

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.token ||  window.localStorage.token;

  // 判断是否登录
  if (token) {
    next();
  } else {
    if (ROUTER_WIHITELIST.includes(to.path)) {
      next();
    } else {
      // next({ name: 'login' });
      const redirect_url = from.query.redirect_url || encodeURIComponent(window.location.href)
      next({ name: 'login', query: { redirect_url } });
    }
  }
})


export default router
