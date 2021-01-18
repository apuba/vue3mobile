<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-17 22:14:16
 * @LastEditTime: 2021-01-19 00:20:21
 * @LastEditors: 侯兴章
 * @Description: 
-->


<template>
  <div>
    <slot></slot>
    <div class="loading" v-show="!value">
      <Loading size="18px">数据加载中...</Loading>
    </div>
  </div>
</template>

<script lang="ts">



import { defineComponent, onMounted, onUnmounted, reactive, toRaw } from 'vue'
import { Loading } from 'vant';

export default defineComponent({
  name: 'ComScrollPage',
  components: {
    Loading
  },
  props: {
    value: { // 是否可以加载数据
      type: Boolean,
      default: true
    },
    reload: { // 重置参数
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 100
    }
  },
  emits: ['loadData', 'update:value', 'update:reload'],
  //   computed: {
  //     isVisible: {
  //       get(): boolean {
  //         return this.value;
  //       },
  //       set(value: boolean) {
  //         this.$emit('update:value', value);
  //       }
  //     }
  //   },
  setup(props, context) {

    const originState = {
      pageHeight: [], // 存储已变化的页面高度， 
      maxHeight: 0, // 存储已加载过的页面高度。
      inBottomCount: 0, // 到底的次数
      isBottom: true // 是否已经到底
    }
    let state = reactive({...originState})

    const onScroll = () => {
      if (!props.value) return;

      if (props.reload) {
          state = reactive({...originState});
          context.emit('update:reload', false);

      }

      const app = document.querySelector('#app');
      if (!app) return;
      // 可滚动容器的高度
      const pageHeight = app.clientHeight
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
        context.emit('update:value', false);
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
.loading {
  text-align: center;
  padding: 8px;
}
</style>