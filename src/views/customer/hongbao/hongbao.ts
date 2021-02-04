/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-31 04:32:39
 * @LastEditTime: 2021-02-04 03:24:02
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { Swipe, SwipeItem, Image, Button, Overlay, Toast, NoticeBar, NavBar, Icon } from 'vant';
import Poster from '../Poster.vue';
import { saveToImage } from '@/common/helper/html2Image';
import { useStore, mapState } from 'vuex';
import { ServIsOpenHongbao, ServOpenHongbao, ServGetBase64Img, ServGetActivity, ServGetActivityQrcode, ServLogin } from '@/service/appService';
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
        const { enteInfo } = store.state;

        const userInfo = JSON.parse(window.localStorage.userInfo);
        const refState = reactive({
            isOpening: false, // 当前正在拆红包
            isUndertaker: false, // 当前用户是否是活动承接人，活动承接人可以生成海报进行分享。
            activity: {} as any,
            bannerList: [],
            showGoback: false, //显示返回按钮
            showActivityRule: false, // 显示 活动规则
            showPoster: false, // 显示海报
            isShared: false, // 进行分享状态     
            createPosterStatus: 0,// 创建海报状态  0 未创建 1 创建中 2已创建
            loadBase64: 0 // 需要转换头像与活动二维码的图片至base64格式，  为2时转换完毕,方可以生成海报
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
            ServOpenHongbao(refState.activity.activityId).then(res => {
                refState.isOpening = false;
                if (res.data) {
                    switch (res.data.code) {
                        case 30001: // 活动已结束
                            refState.activity.activityStatus = 3;
                            break;
                        case 30007: // 已领取
                            refState.isShared = !refState.isShared;
                            break;
                        case 30006: // 已发送
                            refState.isShared = !refState.isShared;
                            break;
                        case 30003: // 未关注承接人
                            Toast(res.data.msg)
                            break;
                    }
                }
            })
        }


        // 查询当前活动数据
        const getActivityData = (activityId: number, queryParams: any = {}) => {
            console.log('获取活动请求--')
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

                // 判断当前用户是否为承接人
                if (!userInfo.qyUserId) {
                    refState.isUndertaker = false;
                } else {
                    refState.activity.undertaker.some((item: { qyUserId: number; }) => {
                        if (item.qyUserId === userInfo.qyUserId) {
                            refState.isUndertaker = true;
                            return
                        }
                    })
                }

                refState.activity.isUndertaker = refState.isUndertaker; // 判断是否承接人
                console.log('当前用户信息--', userInfo);
                console.log('判断当前用户是否为承接人--', refState.isUndertaker);
                /*  if (refState.isUndertaker) {
                     console.log('获取 活动二维码--')
                     ServGetActivityQrcode(activityId, userInfo.memberId).then(res => {
                         // 获取活动二维码 base64
                         if (res.data) {
                             refState.activity.qrCode = res.data.base64;
                             refState.loadBase64 += 1;
                         }
                     })
                 } else {
                     refState.loadBase64 += 1;
                     // 普通用户生成的二维码链接
                     queryParams.userType = 'share';
                     queryParams.realMemberId= userInfo.memberId;
                     refState.activity.qrCodeContent = window.location.origin + '/login?result=' + encodeURIComponent(JSON.stringify(queryParams));
                     console.log(refState.activity.qrCodeContent)
                 } */

                refState.loadBase64 += 1;
                // 普通用户生成的二维码链接
                queryParams.userType = 'share';
                // queryParams.realMemberId= userInfo.memberId; // 当前
                queryParams.inviteesId = userInfo.memberId; // 承接人ID
                queryParams.activityId = activityId; // 活动id

                refState.activity.qrCodeContent = window.location.origin + '/login?result=' + encodeURIComponent(JSON.stringify(queryParams));
                console.log(refState.activity.qrCodeContent)


                const { headUrl } = userInfo;
                const { corpSquareLogoUrl } = enteInfo;
                const photo = headUrl || corpSquareLogoUrl
                if (photo) {
                    ServGetBase64Img(photo).then(res => {
                        // 获取头像,转为base64
                        refState.activity.headUrl = res.data.base64;
                        refState.loadBase64 += 1;
                    })
                } else {
                    refState.loadBase64 += 1;
                }
            })
        }
        const onClickLeft = () => {
            router.go(-1);
        }

        // 初始化数据
        const initData = async () => {
            console.log('当前用户信息-刚进来-initData', userInfo);
            let id = router.currentRoute.value.query.activityId as string;
            let queryParams;
            if (!id) {
                const result = router.currentRoute.value.query.result as string;
                if (!result) return console.log('缺少参数');
                queryParams = JSON.parse(decodeURIComponent(result));
                id = queryParams.activityId
            }
            const activityId = parseInt(id);

            console.log('当前用户信息--initData', userInfo);
            getActivityData(activityId, queryParams);
            // 是否拆过红包
            ServIsOpenHongbao(activityId).then(res => {
                refState.isShared = res.data.isOpen; // 是否已折过红包 ？
            })
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