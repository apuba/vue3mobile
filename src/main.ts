/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-01 20:21:47
 * @LastEditTime: 2021-03-14 12:45:55
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vconsole from 'vconsole';

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// IS_PROD && (new Vconsole());
// import "lib-flexible/flexible.js"
// import 'vant/lib/index.css';
// import 'vant/lib/index.less';
const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app')

window.__app__ = app