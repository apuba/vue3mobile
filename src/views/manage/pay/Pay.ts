/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-21 21:25:30
 * @LastEditTime: 2021-01-24 23:59:05
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { defineComponent, reactive, toRef, toRefs } from 'vue';
import { NavBar, Button } from 'vant';
import router from '@/router';
import { ServcreateOrder } from '@/service/appService';
import { IcreateOrder } from '@/service/appModel';
export default defineComponent({
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button
    },
    setup() {
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
                    window.location.href = res.data.mweb_url;
                })
            },
            goto: (url: string) => {
                router.push('/flowRecord?type=0')
            }
        }
        return { ...toRefs(state), ...toRefs(methods) }
    }
})