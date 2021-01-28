/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-21 21:25:30
 * @LastEditTime: 2021-01-28 22:33:38
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { defineComponent, onMounted, reactive, toRef, toRefs } from 'vue';
import { NavBar, Button } from 'vant';
import router from '@/router';
import { ServcreateOrder } from '@/service/appService';
import { IcreateOrder } from '@/service/appModel';
import { mapState, useStore } from 'vuex';

export default defineComponent({
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button
    },
    computed: {
        ...mapState(['enteInfo'])
    },

    setup() {
        const store = useStore();

        const state = reactive({
            priceList: [0.01, 2000, 3000, 5000, 10000, 50000],
            choosePrice: 5000
        })
        const methods = {
            onClickLeft: () => {
                router.go(-1);
            },
            choosePriceHandler: (price: number) => {
                state.choosePrice = price;
            },
            createOrderHandler: () => {
                // 订单支付
                const params: IcreateOrder = {
                    actualAmt: state.choosePrice,
                    num: 1
                }
                ServcreateOrder(params).then(res => {
                    const url = `${res.data.mweb_url}&redirect_url=${location.origin}/paySuccess?orderCode=${res.data.orderCode}`;
                    console.log(url);
                    store.commit('setPayAgainUrl', url);
                    console.log(store)
                    debugger
                    window.location.href = url;
                })
            },
            goto: (url: string) => {
                router.push('/flowRecord?type=0')
            }
        }
        onMounted(() => {
            // console.log(router.options.to)
        })
        return { ...toRefs(state), ...toRefs(methods) }
    }
})