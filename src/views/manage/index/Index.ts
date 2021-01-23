/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-29 23:30:25
 * @LastEditTime: 2021-01-24 00:53:42
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { defineComponent, onMounted } from 'vue'
import Header from './Header.vue';
import Total from './Total.vue';
import Admin from './Admin.vue';
import ActiveList from './ActiveList.vue';
import { ServSinge } from '@/service/appService';
export default defineComponent({
    components: {
        Header,
        Total,
        Admin,
        ActiveList
    },
    setup() {
        onMounted(() => {
            ServSinge()
        })

        return {}
    }
})