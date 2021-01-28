<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-28 02:06:13
 * @LastEditTime: 2021-01-28 03:09:51
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <li
    class="avatar-img"
    v-for="item in dataList"
    :key="item.id"
    @click="activeContactHandler(item.id)"
    :class="{ active: activeList.indexOf(item.id) > -1 }"
  >
    <span class="mask" @click="deleContactHandler(item.id)">X</span>
    <van-image width="36" height="36" :src="item.avatar" />
  </li>
</template>

<script lang="ts">
import _ from 'lodash';
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { IAvaterModel } from '@/service/appModel';
import { Image } from 'vant';

export default defineComponent({
  name: 'comp_avatar',
  components: {
    [Image.name]: Image
  },
  props: {
    dataList: {
      type: Array as PropType<Array<IAvaterModel>>,
      default: () => [],
      required: true
    },

  },
  emits: ['delHandler', 'update:dataList'],
  setup(props, content) {
    const state = reactive({
      activeList: [] as Array<string>,

    })
    const activeContactHandler = (id: string) => {
      // 添删除标识
      state.activeList.push(id);
      setTimeout(() => {
        _.remove(state.activeList, item => item === id);
      }, 2500)
    }

    const deleContactHandler = (id: string) => {
      // 删除已选择
      const list = _.remove(props.dataList, item => item.id === id);
      content.emit('delHandler', id);
      content.emit('update:dataList', list)
    }
    return { activeContactHandler, ...toRefs(state), deleContactHandler }
  }
})
</script>

<style scoped lang="scss">
.avatar-img {
  display: inline-block;
  width: 36px;
  height: 36px;
  margin: 0 6px;
  position: relative;
  overflow: hidden;
  line-height: 36px;
  text-align: center;
  border-radius: 18px;
  .mask {
    display: none;
  }
  &.active {
    .mask {
      display: inline-block;
      color: rgb(255, 0, 0);
      background: rgba($color: rgb(0, 0, 0), $alpha: 0.6);
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      font-size: 22px;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>