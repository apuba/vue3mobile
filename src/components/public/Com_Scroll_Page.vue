<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-17 22:14:16
 * @LastEditTime: 2021-01-18 01:55:06
 * @LastEditors: 侯兴章
 * @Description: 
-->


<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">

/**　监听滚动事件
   *  @param stopCondition 停计算条件,当为true时就会停
   *  @param callback　运行的回调
   * 　*/


import { defineComponent, onMounted, onUnmounted, reactive } from 'vue'

export default defineComponent({
  name: 'comScrollPage',
  props: {
    isStop: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 100
    }
  },
  emits: ['loadData'],
  setup(props, context) {

    const originState = {
      pageHeight: [], // 存储已变化的页面高度， 
      maxHeight: 0, // 存储已加载过的页面高度。
      inBottomCount: 0, // 到底的次数
      isBottom: true // 是否已经到底
    }
    const state = reactive(originState)

    const onScroll = () => {
      if (props.isStop === true) return;
      // 可滚动容器的高度
      const pageHeight = document.querySelector('#app').clientHeight;
      // 屏幕尺寸高度
      const screenHeight = document.documentElement.clientHeight;
      // 可滚动容器超出当前窗口显示范围的高度
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      const scrollHeight = screenHeight + scrollTop + props.offset; // parseInt(); // 当滚动到底部接近100px的时候触发
      // console.log(`==>屏幕高度${screenHeight};==>容器高度${pageHeight}；==> 滚动条的位置${scrollTop};==>已滚动的高度${scrollHeight};`);

      // 如果页面的高度变化
      /* 	if (state.pageHeight.indexOf(pageHeight) === -1) {
          state.pageHeight.push(pageHeight); // 存储当前已变化的页面高度
          state.isBottom = false;
        } */

      if (state.maxHeight < pageHeight) {
        state.maxHeight = pageHeight
        if (state.maxHeight > 0) state.isBottom = false;
      }

      if (pageHeight <= scrollHeight && !state.isBottom) {
        console.log(`==>屏幕高度${screenHeight};==>容器高度${pageHeight}；==> 滚动条的位置${scrollTop};==>已滚动的高度${scrollHeight};`);
        state.inBottomCount++;
        console.log(`第 ${state.inBottomCount} 次到底了哦====>`);
        state.isBottom = true;
        // if (onBottom && typeof onBottom === 'function') onBottom(state);
        context.emit('loadData', state);
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', onScroll, true);
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll, true);
    })
    return {}
  }
})
</script>

<style scoped>
</style>