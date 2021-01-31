/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-31 04:32:39
 * @LastEditTime: 2021-02-01 02:02:14
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { Swipe, SwipeItem, Image, Button, Overlay, Toast, NoticeBar, NavBar, Icon } from 'vant';
import Poster from '../Poster.vue';
import { saveToImage } from '@/common/helper/html2Image';
import { useStore, mapState } from 'vuex';
import { ServIsOpenHongbao, ServOpenHongbao, ServGetBase64Img, ServGetActivity } from '@/service/appService';
import _ from 'lodash';
import { BaseRequestModel } from '@/service/baseModel';
import router from '@/router';

export default defineComponent({
    components: {
        Poster,
        [NavBar.name]: NavBar,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Image.name]: Image,
        [Button.name]: Button,
        [Overlay.name]: Overlay,
        [NoticeBar.name]: NoticeBar,
        [Icon.name]: Icon

    },
    computed: {
        ...mapState(['enteInfo', 'userInfo'])
    },
    setup() {
        const store = useStore();
        const userInfo = store.state.userInfo;
        const activity = _.cloneDeep(store.getters.getCurrentActivity) // store.state.currentActivity;
        console.log(activity)

        // let bannerList = [];


        const refState = reactive({
            isOpening: false, // 当前正在拆红包
            activity,
            bannerList: [],
            showGoback: false, //显示返回按钮
            showActivityRule: false, // 显示 活动规则
            showPoster: false, // 显示海报
            isShared: false, // 进行分享状态     
            createPosterStatus: 0 // 创建海报状态  0 未创建 1 创建中 2已创建
        })

        // refState.activity.activityStatus = 2; // 进行中 测试状态，调试完需要删除 活动状态 1:待启动 2：进行中 3：已结束 4：暂停
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
            if (refState.activity.activityStatus === 3) {
                Toast('活动已结束');
                return
            }
        }

        // 拆新人红包
        const openHongbaoHandler = () => {
            if (refState.isOpening) return;
            refState.isOpening = true;
            ServOpenHongbao(activity.activityId).then(res => {
                refState.isOpening = false;
                if (res.data) {
                    refState.isShared = !refState.isShared;

                    switch (res.data.code) {
                        case 30001: // 活动已结束
                            refState.activity.activityStatus = 3;
                            break;
                        case 30007: // 已领取

                            break;
                        case 30006: // 已发送

                            break;
                    }
                }
            })
        }

        // 是否拆过红包
        ServIsOpenHongbao(activity.activityId).then(res => {
            refState.isShared = res.data.isOpen; // 是否已折过红包 ？            
        })

        // 查询当前活动数据
        const getActivityData = () => {
            const activityId = router.currentRoute.value.query.id;
            const query: BaseRequestModel = {
                params: {
                    activityId
                },
                pageIndex: 1,
                pageRows: 10,
            };
            ServGetActivity(query).then(res => {
                refState.activity = res.records[0];
                refState.activity.initMemberCount += Math.round(Math.random() * 100); // 在领取人的基础上随机再添加人数
                refState.bannerList = JSON.parse(refState.activity.banner);
            })
        }
        const onClickLeft = () => {
            router.go(-1);
        }

        // 初始化数据
        const initData = () => {
            if (!activity.activityId) {
                getActivityData();
            } else {
                refState.showGoback = true; // 显示返回按钮
                if (activity.banner) {
                    refState.bannerList = JSON.parse(activity.banner);
                }
            }
        }

        onMounted(() => {
            initData();
        })
        return {
            ...toRefs(refState),
            ...state,
            createPosterHandler,
            onClickLeft,
            sharedHandler,
            openHongbaoHandler
        }
    }
})