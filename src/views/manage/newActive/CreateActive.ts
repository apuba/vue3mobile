/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-18 19:57:07
 * @LastEditTime: 2021-01-22 02:24:31
 * @LastEditors: 侯兴章
 * @Description: 
 */


import { defineComponent, onMounted, reactive, toRaw, toRefs } from 'vue'
import { Uploader, NavBar, Form, Field, CellGroup, Switch, Button, Icon, Cell, Image, Calendar, Popup } from 'vant';
import router from '@/router';
import moment from 'moment';
import EmployeeList from './EmployeeList.vue';
import { ServfileUpload, ServSinge } from '@/service/appService';
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
            }
        }

        onMounted(() => {
            ServSinge().then(res => {
                debugger
            })
        })
        return { ...toRefs(methods), ...toRefs(state) }
    }
})
