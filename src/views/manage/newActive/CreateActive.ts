/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-19 01:39:07
 * @LastEditTime: 2021-01-26 01:42:01
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


import { defineComponent, onMounted, reactive, toRaw, toRefs, withCtx } from 'vue'
import { Uploader, NavBar, Form, Field, CellGroup, Switch, Button, Icon, Cell, Image, Calendar, Popup } from 'vant';
import router from '@/router';
import moment from 'moment';
import EmployeeList from './EmployeeList.vue';
import { ServfileUpload, ServAgentSinge } from '@/service/appService';
import _ from 'lodash';


// 联系人基础信息
interface Icontact {
    avatar: string,
    id: string,
    name: string
}

export default defineComponent({
    components: {
        EmployeeList,
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
        [Popup.name]: Popup
    },

    setup() {
        const state = reactive({
            imageList: [],
            showCalendar: false,
            showPeoplePop: false,
            externalContact: [] as Array<Icontact>,
            activeContactList: [] as Array<string>,
            formData: {
                // name: "活动名称",
                // startTime: "2020-01-14 20:00:00",
                endTime: "",
                totalAmount: null,
                newAmountLow: 1.2,
                newAmountHigh: 2.0,
                invitationAmountLow: 1.2,
                invitationAmountHigh: 3,
                sub: "",
                subtitle: "",
                newFlag: true,
                activityEffectiveFlag: true,
                banner: "",
                welcomeMsg: "",
                invitationNumber: 3,
                activityExplain: "",
                externalData: {
                    hongbaoAmount: null,
                    peopleAmount: null,
                },
                undertaker: [{
                    "userid": "123456",
                    "name": "zs",
                    "avatar": "http:www.baidu.com",
                    "open_userid": "open_userid",
                    "mobile": "18078145791"
                }]

            }

        })
        const methods = {
            uploadHandler: (file: any) => {
                // 此时可以自行将文件上传至服务器
                let formData = new FormData();
                formData.append("files", toRaw(file.file)); // files为 后端参数名
                console.log(file);
                debugger
                ServfileUpload(formData).then(res => {

                })
            },
            onClickLeft: () => {
                router.go(-1);
            },
            onSubmit: () => {

            },
            selectEndTime: (date: Date) => {
                state.formData.endTime = moment(date).format('YYYY-MM-DD');
                console.log(state.formData.endTime)
                state.showCalendar = false;
            },
            showCalendarHandler: () => {
                state.showCalendar = true;
            },
            deleContactHandler: (id: string) => {
                // 删除已选择的联系人
                _.remove(state.externalContact, item => item.id === id);
            },
            selectExternalContact: (type = 0) => {
                /* window.wx.invoke('selectExternalContact', {
                    "filterType": type, //0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人。默认值为0；除了0与1，其他值非法。在企业微信2.4.22及以后版本支持该参数
                }, function (res: any) {
                    debugger
                    console.log(res);
                    if (res.err_msg == "selectExternalContact:ok") {
                        state.externalContact = res.userIds; //返回此次选择的外部联系人userId列表，数组类型
                    } else {
                        //错误处理
                    }
                }); */

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
            }
        }

        onMounted(() => {
            ServAgentSinge(); // 应用签名
        })
        return { ...toRefs(methods), ...toRefs(state) }
    }
})
