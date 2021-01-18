/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-18 19:57:07
 * @LastEditTime: 2021-01-19 01:21:08
 * @LastEditors: 侯兴章
 * @Description: 
 */


import { defineComponent, reactive, toRefs } from 'vue'
import { Uploader, NavBar, Form, Field, CellGroup, Switch, Button, Icon, Cell, Image, Calendar } from 'vant';
import router from '@/router';
import moment from 'moment';
export default defineComponent({
    components: {
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
        [Calendar.name]: Calendar
    },
    setup() {

        const state = reactive({
            imageList: [],
            showCalendar: false,
            formData: {
                name: "活动名称",
                startTime: "2020-01-14 20:00:00",
                endTime: "2020-02-14 20:01:22",
                totalAmount: 500,
                newAmountLow: 1.2,
                newAmountHigh: 2.0,
                invitationAmountLow: 1.2,
                invitationAmountHigh: 3,
                sub: "标题",
                subtitle: "副标题",
                newFlag: true,
                activityEffectiveFlag: true,
                banner: "http://www.baidu.com",
                welcomeMsg: "欢迎语",
                invitationNumber: 3,
                activityExplain: "",
                externalData: {
                    hongbaoAmount: 882,
                    peopleAmount: 298
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
            uploadHandler: (file: File) => {
                // 此时可以自行将文件上传至服务器
                console.log(file);
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
        return { ...toRefs(methods), ...toRefs(state) }
    }
})
