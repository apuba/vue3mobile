<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-28 03:24:25
 * @LastEditTime: 2021-01-28 03:29:47
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div>
    <slot></slot>
  </div>
  <span>
    <slot></slot>
  </span>
  <li>
    <slot></slot>
  </li>
  <tr>
    <slot></slot>
  </tr>
  <td>
    <slot></slot>
  </td>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'compDom',
  props: {
    target: {
      type: String,
      default: 'div',
      required: true
    }
  },
  setup() {


    return {}
  }
})
</script>

<style scoped>
</style>