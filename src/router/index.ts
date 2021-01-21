/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-24 22:18:17
 * @LastEditTime: 2021-01-22 01:21:16
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index'
    // component: Home
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
    path: '/pay',
    name: 'pay',
    component: () => import('../views/manage/pay/Pay.vue')
  },
  {
    path: '/FlowRecord',
    name: 'flowRecord',
    component: () => import('../views/manage/pay/FlowRecord.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
