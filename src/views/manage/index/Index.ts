/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-29 23:30:25
 * @LastEditTime: 2021-01-02 02:22:39
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { defineComponent } from 'vue'
import Header from './Header.vue';
import Total from './Total.vue';
import Admin from './Admin.vue';
import ActiveList from './ActiveList.vue';
export default defineComponent({
    components: {
        Header,
        Total,
        Admin,
        ActiveList
    },
    setup() {


        return {}
    }
})