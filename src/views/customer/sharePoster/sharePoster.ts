/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-02-03 21:44:00
 * @LastEditTime: 2021-03-10 23:43:31
 * @LastEditors: 侯兴章
 * @Description: 
 */

import router from '@/router';
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { ServCreateTempQrcode, ServGetActivity, ServGetActivityQrcode, ServGetBase64Img, ServGetEnteInfo, ServGetEnterInfoByActivityId, ServGetMemberInfo, ServIsOpenHongbao } from '@/service/appService';
import { BaseRequestModel } from '@/service/baseModel';
import { useStore, mapState } from 'vuex'
import { Overlay, Toast } from 'vant';

import Poster from '../Poster.vue'

export default defineComponent({
    components: {
        Poster,
        [Overlay.name]: Overlay
    },
    computed: {
        ...mapState(['enteInfo'])
    },
    setup() {
        const store = useStore();
        // const userInfo = store.state.userInfo; 
        const userInfo = JSON.parse(window.localStorage.userInfo);
        const refState = reactive({
            userInfo,
            isUndertaker: false,
            showPoster: false,
            loadBase64: 0,
            isShared: false,
            activity: {} as any,
            hongbaoMiddle: {
                backgroundImage: 'url(' + require('@public/images/hongbaoMiddlePoster.jpg') + ')'
            },
            hongbaoBottom: {
                backgroundImage: ' url(' + require('@public/images/hongbaobgBottom.jpg') + ')'
            },

        })

        // 查询当前活动数据
        const getActivityData = (queryParams: any) => {
            const { activityId } = queryParams
            console.log('获取活动请求--')
            const query: BaseRequestModel = {
                params: {
                    activityId,
                    type:1
                },
                pageIndex: 1,
                pageRows: 10,
            };
            ServGetActivity(query).then(async (res) => {
                if (!res) {
                    console.log('无此活动');
                    Toast('无此活动')
                    return;
                }
                refState.activity = res.records[0];
                refState.activity.initMemberCount += Math.round(Math.random() * 100); // 在领取人的基础上随机再添加人数
                console.log('当前用户信息--', userInfo);
                console.log('获取 活动二维码--')

                ServCreateTempQrcode(queryParams).then(res => {
                    debugger
                    // 获取活动二维码 base64
                    if (res.data) {
                        refState.activity.qrCode = res.data.base64;
                    }
                })
            })
        }

        // 初始化数据
        const initData = () => {
            console.log('当前用户信息-刚进来-initData', userInfo);
            const result = router.currentRoute.value.query.result as string;
            debugger
            if (!result) return console.error('缺少海报参数');
            const queryParams = JSON.parse(decodeURIComponent(result));
            // const id = queryParams.activityId

            const { activityId } = queryParams

            console.log('当前用户信息--initData', userInfo);

            // 是否拆过红包
            ServIsOpenHongbao(activityId).then(res => {
                // refState.isShared = res.data.isOpen; // 是否已折过红包 ？
                if (res.data.isOpen) {
                    router.push(`/customer/hongbao?result=${result}`)
                } else {
                    if (!userInfo.memberId) {
                        ServGetMemberInfo().then(res => {
                            store.commit('setUserInfo', res.data);

                            getActivityData(queryParams);
                        })
                    } else {
                        getActivityData(queryParams);
                    }

                    // 获取企业信息
                    ServGetEnterInfoByActivityId({activityId}).then((res: any) => {
                        store.commit('setEnteInfo', res.data) // 把企业信息存到store
                    })
                }
            })
        }

        onMounted(() => {
            initData();

        })
        return { ...toRefs(refState) }
    }
})