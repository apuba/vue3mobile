/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-29 23:30:25
 * @LastEditTime: 2021-03-06 15:04:20
 * @LastEditors: 3603317@qq.com
 * @Description: 
 */
import { defineComponent, onMounted } from 'vue'
import Header from './Header.vue';
import Total from './Total.vue';
import Admin from './Admin.vue';
import ActiveList from './ActiveList.vue';
import { ServSinge, ServGetEnteInfo, ServAgentSinge, ServGetMemberInfo } from '@/service/appService';
import router from '@/router';
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        Header,
        Total,
        Admin,
        ActiveList
    },
    setup(props, content) {
        const store = useStore();

        // const userInfo = store.state.userInfo;
        const userInfo = window.localStorage.userInfo ? JSON.parse(window.localStorage.userInfo) : {};
        
        if (!userInfo.memberId) {
            ServGetMemberInfo().then(res => {
                debugger
                store.commit('setUserInfo', res.data);
            })
        }
        // 获取企业信息
        ServGetEnteInfo().then((res: any) => {
            store.commit('setEnteInfo', res.data) // 把企业信息存到store
        })
        onMounted(() => {
            // 微信配置签名
            ServSinge().then(res => {
                ServAgentSinge(); // 应用签名
            }); // 签名
        })

        return {}
    }
})