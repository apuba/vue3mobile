<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-14 21:08:13
 * @LastEditTime: 2021-03-14 22:03:05
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div>
    <van-cell-group class="group">
      <van-cell title="高级设置" label="打开后，仅符合设定条件的客户方可领取，请谨慎使用">
        <template #default>
          <van-switch v-model="areaSwitch" size="22" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Cell, CellGroup, Switch } from 'vant';
export default defineComponent({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Switch.name]: Switch
  },
  setup() {
      const refState = reactive({
          areaSwitch:false
      })
    return {...toRefs(refState)}
  }
})
</script>

<style scoped>
</style>