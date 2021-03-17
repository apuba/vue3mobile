/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-13 20:16:41
 * @LastEditTime: 2021-03-14 12:41:25
 * @LastEditors: 侯兴章
 * @Description: 
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Window {
  __app__: any,
  wx: any,
  html2canvas:any,
  vConsole: any
}
