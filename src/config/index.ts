/*
 * @Author: 侯兴章
 * @Date: 2020-10-24 14:49:06
 * @LastEditTime: 2020-12-13 14:16:59
 * @LastEditors: 侯兴章
 * @Description: 
 */
export const APP_NAME: string = 'VUE3.0大型系统前端框架'; // 系统应用名
export const ROUTER_WIHITELIST: string[] = ['/login', '/about']; // 路由白名单
export const BASET_LAYOUT: string = 'default'; // 默认的布局
export const OPEN_KEEPALIVE: boolean = false; // 是否开启KeepAlive缓存  开发时候最好关闭,不然每次都需要清除缓存
export const ENABLED_ROUTER_TRANSTION: boolean = false; // 是否启用路由转场动画？
export const LOCK_SCREEN_TIME: number = 0; // 自动锁屏时间，分钟
export const NESTED_MENU: boolean = false; // 是否采用嵌套路由的菜单？ 当前嵌套路由有问题，暂时先用下划线模式
export const COMPONENT_SETTING: any = { // 全局组件配置
    popupType: 'modal', //  弹窗方法有两种，modal \ drawer 
    drawerPlacement: 'right', // 弹窗出现的位置  top \ left \ right \ bottom
}

export const RETENTION_STORE: boolean = true; // 刷新页面时是否保留状态

export const REQUEST_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8'; // 请求参数类型  'application/json;charset=UTF-8'