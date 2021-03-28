/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-01 20:21:47
 * @LastEditTime: 2021-03-28 12:23:09
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vconsole from 'vconsole';

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
IS_PROD && (new Vconsole());
// import "lib-flexible/flexible.js"
// import 'vant/lib/index.css';
// import 'vant/lib/index.less';
const app = createApp(App);

console.log('当前运行环境', process.env.NODE_ENV);

app.use(store);
app.use(router);
app.mount('#app')

!IS_PROD && (window.sessionStorage.token = "723303977576754270d079297");


// !IS_PROD && (window.sessionStorage.token="72330655390564292d0a7df71"); //  夏末未了

// window.sessionStorage.token="asdasdasdasdasdasdasdasd" 6707589146180307f1fca727c 7216833322981153b0f6accfc

window.__app__ = app