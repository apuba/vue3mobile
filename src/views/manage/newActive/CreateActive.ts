/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-19 01:39:07
 * @LastEditTime: 2021-03-22 23:24:54
 * @LastEditors: 侯兴章
 * @Description: 
 */
/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-18 19:57:07
 * @LastEditTime: 2021-01-23 20:44:03
 * @LastEditors: 侯兴章
 * @Description: 
 */


import { defineComponent, onMounted, provide, reactive, ref, toRaw, toRefs, withCtx } from 'vue'
import { Uploader, NavBar, Form, Field, CellGroup, Switch, Button, Icon, Cell, Image, Calendar, Popup } from 'vant';
import router from '@/router';
import moment from 'moment';

import { ServfileUpload, ServAgentSinge, ServSaveActivity, ServGetActivity, ServeGetActivityRule } from '@/service/appService';
import _ from 'lodash';
import { mapState, useStore } from 'vuex';
import { IAvaterModel } from '@/service/appModel';

// 联系人基础信息
/* interface Icontact {
    avatar: string,
    id: string,
    name: string
} */
import CompAvatar from '@/views/components/CompAvatar.vue';
import { BaseRequestModel } from '@/service/baseModel';
import { mapperHelper } from '@/service/mapperHelper';

import Advanced from './Advanced.vue';
import { Irules } from './Iadvanced';

export default defineComponent({
    components: {
        CompAvatar,
        [Uploader.name]: Uploader,
        [NavBar.name]: NavBar,
        [Form.name]: Form,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Switch.name]: Switch,
        [Button.name]: Button,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [Image.name]: Image,
        [Calendar.name]: Calendar,
        [Popup.name]: Popup,
        Advanced
    },
    computed: {
        ...mapState(['baseInfo', 'enteInfo'])
    },

    setup() {
        const store = useStore();
        const { userInfo } = store.state;
        const initRedCount = Math.round(Math.random() * 5000); // 随机红包个数
        const initMemberCount = Math.round(Math.random() * 1000); // 随机红包领取人数

        //处理高级设置的规则
        const setActivityRules = (rules: Irules) => {
            state.activityRules = rules;
            console.log(state.activityRules)
        }

        const openAdvanced = ref(false); // 打开高级设置
        provide('openAdvanced', ref(openAdvanced)); // 向组件传递 参数
        provide('setActivityRules', setActivityRules); // 向子级组件传函数参数

        const state = reactive({
            openAdvanced: openAdvanced, // 打开高级设置
            pageType: router.currentRoute.value.query.type as string, // 页面类型，是否为编辑页面？ type= edit
            fileList: [] as Array<any>, // 用于显示上传图片回显
            imageList: [] as Array<any>, // 用于上传图片的URL结果集，提交到数据的值
            showCalendar: false,
            showPeoplePop: false,
            externalContact: [{ id: userInfo.qyUserId, avatar: userInfo.headUrl, name: userInfo.name }] as Array<IAvaterModel>,
            activeContactList: [] as Array<string>,
            disabledUpload: false,
            errorPeople: false, // 校验承接人是否为空
            submitBtn: {
                loading: false,
                disabled: false,
                loadingTxt: '创建中...'
            },
            activityRules: {} as Irules,
            formData: {
                // name: "活动名称",
                // startTime: "2020-01-14 20:00:00",
                endTime: "",
                totalAmount: 10,
                newAmountLow: 1.2,
                newAmountHigh: 2.0,
                invitationAmountLow: 1.2,
                invitationAmountHigh: 3,
                sub: "",
                subtitle: "",
                newFlag: true,
                activityEffectiveFlag: true,
                banner: [] as Array<string>,
                welcomeMsg: "",
                invitationNumber: 3,
                activityExplain: "",
                externalData: true,
                initMemberCount,
                initRedCount,
                undertaker: [] as Array<any>,
            }
        })


        const activityExplain = ref(createActivityExplain()); // 活动说明文
        function createActivityExplain() {
            return `结束时间：${state.formData.newFlag ? '长期有效' : `即日起至${state.formData.endTime}`}，红包抢完提 前结束；
红包规则：首次添加客服企业微信可获得红包；
邀请规则：邀请好友添加客服企业微信以首次为主，之前有添加过则无奖励； 邀请攻略：邀请${state.formData.invitationNumber}个好友可获得1个现金红包，不累计产生红包，请及时拆开，否则更多邀请将不会产 生更多红包`
        }

        const methods = {
            updateActivityExplain: () => {
                // 更新活动说明
                activityExplain.value = createActivityExplain();
            },
            validoterAmount: (val: string) => {
                const num = parseInt(val);
                // const r = (num <= store.state.enteInfo.balance) && (num >= 500);
                const r = (num <= store.state.enteInfo.balance) && (num >= 10);
                console.log(r)
                // 校验活动金额
                return r
            },
            deleteBannerHandler: (file: any, detail: any) => {
                // 删除已上传的图片
                if (file.status !== "failed") {
                    _.remove(state.imageList, (item, index) => index === detail.index);
                }
                // console.log(state.imageList);
            },
            uploadHandler: (file: any) => {
                state.disabledUpload = true;
                // 此时可以自行将文件上传至服务器
                let formData = new FormData();
                formData.append("files", toRaw(file.file)); // files为 后端参数名
                formData.append('timestamp', (new Date().getTime()).toString())
                console.log(file);
                file.status = 'uploading';
                file.message = '上传中...';
                ServfileUpload(formData).then(res => {
                    state.disabledUpload = false;
                    if (!res.data) {
                        file.status = 'failed';
                        file.message = '上传失败';
                        return
                    }
                    file.status = 'done';
                    file.message = '';
                    const url = res.data[0].filePath;
                    state.imageList.push({
                        url
                    })
                })
            },
            onClickLeft: () => {
                console.log(router)
                router.go(-1);
            },
            onSubmit: (values: any) => {
                console.log('校验结题', values)
                // const params = _.cloneDeep(state.formData);
                state.formData.banner = state.imageList.map(item => item.url);
                const params: any = { ...state.formData, ...state.activityRules }
                if (!state.externalContact.length) {
                    state.errorPeople = true;
                    return;
                }
                state.errorPeople = false;
                params.undertaker = state.externalContact.map(item => {
                    return {
                        qyUserid: item.id,
                        avatar: item.avatar,
                        name: item.name
                    }
                })
                params.newFlag = state.formData.newFlag ? 1 : 0;  // 启用新人红包
                params.activityEffectiveFlag = state.formData.activityEffectiveFlag ? 0 : 1; // 是否长期有效
                params.externalData = state.formData.externalData ? 1 : 0; // 对外数据 
                params.activityExplain = params.activityExplain || activityExplain.value;

                console.log('提交表单的参数------', params);

                state.submitBtn.disabled = true;
                state.submitBtn.loading = true;

                // 提交创建活动
                ServSaveActivity(params).then(res => {
                    console.log('创建活动结果 ----- ', res)
                    state.submitBtn.disabled = false;
                    state.submitBtn.loading = false;
                    if (res.data && res.data.activityId) {
                        router.push(`/customer/hongbao?activityId=${res.data.activityId}`);
                    }
                })

            },
            selectEndTime: (date: Date) => {
                state.formData.endTime = moment(date).format('YYYY-MM-DD');
                console.log(state.formData.endTime)
                state.showCalendar = false;
                methods.updateActivityExplain(); // 更新活动说明
            },
            showCalendarHandler: () => {
                state.showCalendar = true;
            },
            deleContactHandler: (id: number) => {
                // 删除已选择的联系人
                _.remove(state.externalContact, item => item.id === id);
            },
            selectExternalContact: (type = 0) => {
                const selectedUserIds = state.externalContact.map(item => item.id); // 已选择的成员
                window.wx.invoke("selectEnterpriseContact", {
                    "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                    "mode": "multi",// 必填，选择模式，single表示单选，multi表示多选
                    "type": ["department", "user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                    "selectedDepartmentIds": [],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                    "selectedUserIds": selectedUserIds // ["lisi", "lisi2"]// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                }, function (res: any) {
                    console.log('选择通信录成员成功------', res);
                    if (res.err_msg == "selectEnterpriseContact:ok") {
                        if (typeof res.result === 'string') {
                            res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                        }
                        state.externalContact = res.result.userList;
                        console.log(state.externalContact)
                        state.errorPeople = false;
                    }
                }
                );
            },
            activeContactHandler: (id: string) => {
                // 添删除标识
                state.activeContactList.push(id);
                setTimeout(() => {
                    _.remove(state.activeContactList, item => item === id);
                }, 2500)
            },

        }

        const validator = {
            total: [{ required: true, message: '请输入' }],
            sub: [{ required: true, message: '请输入标题' }],
            subtitle: [{ required: true, message: '请输入副标题' }],
            totalAmount: [{ required: true, message: '请输入活动金额' },
            { trigger: 'onChange', validator: methods.validoterAmount, message: '活动金额须大于10且小于等于余额' }],
            endTime: [{ required: true, message: '请输入结束时间' }],
            banner: [{ required: true, message: '请上传图片' }],
            welcomeMsg: [{ required: true, message: '请输入欢迎语' }],
            newAmountLow: [{ required: true, message: '请输入最低红包' }],
            newAmountHigh: [{ required: true, message: '请输入最高红包' }],
            invitationAmountLow: [{ required: true, message: '请输入邀请最低红包' }],
            baninvitationAmountHighner: [{ required: true, message: '请输入邀请最高红包' }],
            invitationNumber: [{ required: true, message: '请输入邀请数量' }],
            initRedCount: [{ required: true, message: '请输入初始化红包数' }],
            initMemberCount: [{ required: true, message: '请输入初始化会员数' }],
            undertaker: [{ required: true, message: '承接人至少一个' }],
        }

        // 查询当前活动数据
        const getActivityData = (activityId: number | string) => {
            const query: BaseRequestModel = {
                params: {
                    activityId
                },
                pageIndex: 1,
                pageRows: 10,
            };
            ServGetActivity(query).then(res => {
                // refState.activity = res.records[0];
                const data = res.records[0];
                state.formData = {
                    ...state.formData,
                    ...data
                }
                state.imageList = JSON.parse(data.banner);
                state.formData.activityEffectiveFlag = data.activityEffectiveFlag === 0;
                state.formData.newFlag = data.newFlag === 1;
                state.formData.externalData = data.externalData === 1;
                state.externalContact = mapperHelper(res.records[0].undertaker, { name: 'name', id: 'qyUserId', avatar: 'headUrl' })
                console.log(state.formData)
            })
        }

        onMounted(() => {
            ServAgentSinge(); // 应用签名
            const activityId = router.currentRoute.value.query.activityId as string;
            if (activityId) {
                getActivityData(activityId);
                ServeGetActivityRule(activityId).then(rules => {
                    // 获取活动的规则（高级设置）
                    if( JSON.stringify(rules) !=='{}') {
                        state.activityRules = rules
                    } 
                })
            }

        })
        return { ...toRefs(methods), ...toRefs(state), validator, activityExplain }
    }
})
