/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-02-01 20:50:13
 * @LastEditTime: 2021-02-02 02:00:31
 * @LastEditors: 侯兴章
 * @Description: 
 */
import { defineComponent, onMounted, reactive, ref, toRaw, toRefs, } from 'vue'
import { Tab, Tabs, Swipe, Cell, CellGroup, Switch, Button, NavBar, SwipeItem, Grid, GridItem } from 'vant';
import router from '@/router';
import { useStore } from 'vuex';
import _ from 'lodash';
import CompAvatar from '@/views/components/CompAvatar.vue';
import { ServGetActivity, ServGetGrantData, ServGetActivityInfo, ServGetInviteesInfo } from '@/service/appService';
import { BaseRequestModel } from '@/service/baseModel';
import { IAvaterModel } from '@/service/appModel';
import { mapperHelper } from '@/service/mapperHelper';
import InvitationList from './InvitationList.vue';


export default defineComponent({
    components: {
        InvitationList,
        CompAvatar,
        [GridItem.name]: GridItem,
        [Grid.name]: Grid,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [Swipe.name]: Swipe,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Switch.name]: Switch,
        [Button.name]: Button,
        [NavBar.name]: NavBar,
        [SwipeItem.name]: SwipeItem,
    },
    setup() {
        const store = useStore();
        const userInfo = store.state.userInfo;
        // const activity = _.cloneDeep(store.getters.getCurrentActivity) // store.state.currentActivity;
        // console.log(activity)
        // activity.banner = JSON.parse(activity.banner);

        const refState = reactive({
            activity: {} as any,
            invitationData: [], // 邀请数据
            bannerList: [],
            externalContact: [] as Array<IAvaterModel>,
            active: router.currentRoute.value.query.type === 'detail' ? 0 : 1,
            isLoaded: false, //详情数据是否已加载
            activityTotalData: {
                shareNumber: 0, // 分享次数
                memberNumber: 0, // 新增会员数
                clickNumber: 0, // 点击数据 
                useAmount: 0, // 获客成本
                countMember: 0, // 已发放新人红包个数
                inviteesAmt: 0, // 已发放邀请红包金额
                inviteesMember: 0, // 已发放邀请红包个数,
                surplusAmount: 0, //活动剩余金额
                actualAmt: 0, // 已发新人红包金额
            }
        })
        const onClickLeft = () => {
            router.go(-1);
        }
        const activityId = router.currentRoute.value.query.id as string;

        // 查询当前活动数据
        const getActivityData = () => {
            const query: BaseRequestModel = {
                params: {
                    activityId
                },
                pageIndex: 1,
                pageRows: 10,
            };
            ServGetActivity(query).then(res => {
                refState.activity = res.records[0];
                refState.bannerList = JSON.parse(refState.activity.banner);
                refState.activity.activityEffectiveFlag = refState.activity.activityEffectiveFlag === 1;
                refState.activity.newFlag = refState.activity.newFlag === 1;
                refState.externalContact = mapperHelper(res.records[0].undertaker, { name: 'name', id: 'avtivityId', avatar: 'headUrl' })
                refState.isLoaded = true;
            })
        }

        const changeType = () => {
            !refState.isLoaded && getActivityData();
        }

        const getInvitationData = () => {
            const param: BaseRequestModel = {
                params: {
                    activityId
                },
                pageIndex: 1,
                pageRows: 10
            }
            ServGetInviteesInfo(param).then(res => {
                // debugger
            })
        }

        const initData = () => {
            if (refState.active === 0) {
                // 数据详情
                getActivityData();
            } else {
                ServGetGrantData(parseInt(activityId)).then(res => {
                    if (res.data) {
                        refState.activityTotalData = {
                            ...refState.activityTotalData,
                            ...res.data
                        }
                    }
                })

                ServGetActivityInfo(parseInt(activityId)).then(res => {
                    if (res.data) {
                        refState.activityTotalData = {
                            ...refState.activityTotalData,
                            ...res.data
                        }
                    }
                })

                getInvitationData();

            }
        }
        onMounted(() => {
            initData()
        })

        return {
            ...toRefs(refState),
            onClickLeft,
            changeType
        }
    }
})