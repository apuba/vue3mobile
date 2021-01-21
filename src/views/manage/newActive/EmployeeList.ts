/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-19 22:32:54
 * @LastEditTime: 2021-01-20 21:17:30
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { Image, Checkbox, Button } from 'vant';
import { ServGetFollowUserList } from '@/service/appService';

interface Iemployee {
    avatar: string,
    name: string,
    userid: string,
    checked: boolean
}

export default defineComponent({
    components: {
        [Image.name]: Image,
        [Checkbox.name]: Checkbox,
        [Button.name]: Button

    },
    props: {
        value: {
            type: Array,
            default: []
        }
    },
    emits: ['update:value'],
    setup(props, content) {

        const checkedList = [];
        const state = reactive({
            list: [] as Array<Iemployee>
        })
        const methods = {
            getCheckedHandler: (e: MouseEvent, item: Iemployee) => {
                e.preventDefault();
                console.log(item)
                item.checked = !item.checked

            },
            confirmHandler: () => {
                content.emit('update:value')
            }

        }
        onMounted(() => {
            ServGetFollowUserList().then(data => {
                state.list = data
                console.log(state)
            })
        })

        /*   watch(state.list, (newval, oldval)=> {
              debugger
          }, { deep: true})
   */
        return { ...toRefs(state), ...methods }
    }
})