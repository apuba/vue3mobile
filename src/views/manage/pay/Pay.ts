/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-21 21:25:30
 * @LastEditTime: 2021-03-14 12:31:01
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { defineComponent, onMounted, reactive, toRef, toRefs } from 'vue';
import { NavBar, Button, Field, Toast } from 'vant';
import router from '@/router';
import { ServcreateOrder } from '@/service/appService';
import { IcreateOrder } from '@/service/appModel';
import { mapState, useStore } from 'vuex';

export default defineComponent({
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [Field.name]: Field
    },
    computed: {
        ...mapState(['enteInfo'])
    },
    setup() {
        const store = useStore();
        const state = reactive({
            priceList: [0.01, 200, 300, 500, 1000, 5000, -1],
            choosePrice: 500,
            chooseIndex: -1,
            // otherPrice: null as any,
            priceError: false
        })
        const methods = {
            otherPriceHandler(val: number) {
                 state.priceError = !val;
            },
            onClickLeft: () => {
                router.go(-1);
            },
            choosePriceHandler: (price: number, index: number) => {
                state.chooseIndex = index;
                state.choosePrice = index + 1 === state.priceList.length ? state.choosePrice : price;               
                console.log(price, index)
            },
            createOrderHandler: () => {
                if (state.priceError || state.choosePrice == 0) {
                    return Toast.fail('请输入金额');
                }
                // 订单支付
                const params: IcreateOrder = {
                    actualAmt: state.choosePrice, //(state.choosePrice === -1 ? state.otherPrice : state.choosePrice),
                    num: 1
                }
                
                ServcreateOrder(params).then(res => {
                    const url = `${res.data.mweb_url}&redirect_url=${location.origin}/paySuccess?orderCode=${res.data.orderCode}`;                
                    store.commit('setPayAgainUrl', url);                  
                    window.location.href = url;
                })
            },
            goto: (url: string) => {
                router.push('/flowRecord?type=0')
            }
        }
        onMounted(() => {


        })
        return { ...toRefs(state), ...toRefs(methods) }
    }
})