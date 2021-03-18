<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-14 21:08:13
 * @LastEditTime: 2021-03-18 00:44:01
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div>
    <van-cell-group class="group">
      <van-cell class="lable" title="指定区域" label="启用后只有指定条件客户可领取">
        <template #default>
          <van-switch v-model="showArea" size="22" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="group" v-if="showArea">
      <van-radio-group v-model="areaType">
        <van-cell
          class="lable"
          title="区域模式"
          value="请选择地区"
          is-link
          label="请选择"
          @click="areaType = '0'"
        >
          <template #icon>
            <van-radio name="0" icon-size="16"></van-radio>
          </template>
        </van-cell>
        <van-cell
          class="lable"
          title="范围模式"
          value="请选择范围"
          is-link
          label="请选择"
          @click="areaType = '1'"
        >
          <template #icon>
            <van-radio name="1" icon-size="16"></van-radio>
          </template>
        </van-cell>
      </van-radio-group>
    </van-cell-group>

    <van-cell class="lable" title="指定性别" label="启用后只有指定条件客户可领取">
      <template #default>
        <van-switch v-model="showGender" size="22" />
      </template>
    </van-cell>
    <van-cell-group class="group" v-if="showGender">
      <div class="container">
        <van-radio-group direction="horizontal" v-model="gender">
          <van-radio name="0" icon-size="16">限男性领取</van-radio>
          <van-radio name="1" icon-size="16">限女领取</van-radio>
        </van-radio-group>
      </div>
    </van-cell-group>

    <div class="btnlist">
      <div class="btnlist-item">
        <van-button type="default" round block @click="cancelHandler">取消</van-button>
      </div>
      <div class="btnlist-item">
        <van-button type="primary" round block>确定</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref, toRefs } from 'vue'
import { Cell, CellGroup, Switch, Icon, Radio, RadioGroup, Button } from 'vant';
export default defineComponent({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Switch.name]: Switch,
    [Icon.name]: Icon,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Button.name]: Button
  },
  setup() {

    const openAdvanced = ref(inject('openAdvanced'));

    const refState = reactive({
      showArea: false,
      showGender: false,
      areaType: 0,
      gender: -1
    })

    const methods = {
      cancelHandler: () => {
        openAdvanced.value = false;
      }
    }
    return { ...toRefs(refState), ...toRefs(methods) }
  }
})
</script>
<style lang="scss" >
.lable {
  .van-cell__label {
    white-space: nowrap;
    // position: absolute;
  }
  .van-radio {
    margin: 4px;
    display: block;
  }
}
</style>
<style scoped lang="scss">
.container {
  padding: 16px;
}
.btnlist {
  margin-top: 24px;
  background: #fff;
  display: flex;
  padding: 16px 0;
  position: fixed;
  width: 100%;
  bottom: 0px;
  .btnlist-item {
    flex: 1;
    padding: 0 8px;
  }
}
</style>