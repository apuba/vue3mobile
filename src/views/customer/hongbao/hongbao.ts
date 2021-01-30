/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-31 04:32:39
 * @LastEditTime: 2021-01-31 04:45:48
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { defineComponent, reactive, toRefs } from 'vue';
import { Swipe, SwipeItem, Image, Button, Overlay, Toast } from 'vant';
import Poster from '../Poster.vue';
import { saveToImage } from '@/common/helper/html2Image';
import { useStore, mapState } from 'vuex';
import { ServIsOpenHongbao, ServOpenHongbao } from '@/service/appService';

import _ from 'lodash';

export default defineComponent({
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Image.name]: Image,
        [Button.name]: Button,
        [Overlay.name]: Overlay,
        Poster
    },
    computed: {
        ...mapState(['enteInfo', 'userInfo'])
    },
    setup() {
        const store = useStore();
        const activity = _.cloneDeep(store.getters.getCurrentActivity) // store.state.currentActivity;
        console.log(activity)

        let bannerList = [];
        if (activity.banner) {
            bannerList = JSON.parse(activity.banner);
        }

        const refState = reactive({
            activity,
            bannerList,
            showActivityRule: false, // 显示 活动规则
            showPoster: false, // 显示海报
            isShared: false, // 进行分享状态     
            //   activityStatus: activity.activityStatus || 2, // 活动状态 1:待启动 2：进行中 3：已结束 4：暂停
            createPosterStatus: 0 // 创建海报状态  0 未创建 1 创建中 2已创建
        })

        refState.activity.activityStatus = 2; // 测试状态，调试完需要删除
        refState.activity.initMemberCount += Math.round(Math.random() * 100); // 在领取人的基础上随机再添加人数


        const state = {
            bgStyle: {
                backgroundImage: ' url(' + require('@public/images/hongbao2.png') + '),url(' + require('@public/images/hongbaobg.jpg') + ') '
            },
            hongbaoTop: {
                backgroundImage: ' url(' + require('@public/images/hongbaobgTop.jpg') + ')'
            },
            hongbaoMiddle: {
                backgroundImage: 'url(' + require('@public/images/hongbaoMiddle.jpg') + ')'
            },
            hongbaoBottom: {
                backgroundImage: ' url(' + require('@public/images/hongbaobgBottom.jpg') + ')'
            },
        }

        const createPosterHandler = () => {
            // html生成海报图片
            refState.showPoster = true;
            if (refState.createPosterStatus === 2) return; // 已经创建成功海报，不需要再进行创建
            refState.createPosterStatus = 1;
            saveToImage('#hongbaoPoster', '.imgContainer').then(res => {
                refState.createPosterStatus = 2;
            })
        }

        const sharedHandler = () => {      // 分享
            if (refState.activity.activityStatus === 4) {
                Toast('活动已结束');
                return
            }
        }

        // 拆新人红包
        const openHongbaoHandler = () => {
            ServOpenHongbao(activity.activityId).then(res => {
                debugger
                if (res.data) {
                    refState.isShared = !refState.isShared;
                }
            })
        }

        // 是否拆过红包
        ServIsOpenHongbao(activity.activityId).then(res => {
            refState.isShared = res.data.isOpen; // 是否已折过红包 ？            
        })

        return {
            ...toRefs(refState),
            ...state,
            createPosterHandler,
            sharedHandler,
            openHongbaoHandler
        }
    }
})