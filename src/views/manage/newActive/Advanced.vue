<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-14 21:08:13
 * @LastEditTime: 2021-03-22 21:29:14
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

    <div class="group" v-if="showArea">
      <van-radio-group v-model="areaType">
        <van-cell class="lable" title="区域模式" is-link @click="areaType='0'">
          <template #icon>
            <van-radio name="0" icon-size="16"></van-radio>
          </template>
          <template #default>
            <span @click="showCityPop=true">请选择</span>
          </template>
        </van-cell>
        <div class="marker" v-show="areaType === '0' && cityLable" @click="showCityPop=true ">
          <div class="txt">{{ cityLable }}</div>
        </div>

        <van-cell class="lable" title="范围模式" is-link @click="areaType='1'">
          <template #default>
            <span @click="showMapHandler">请选择</span>
          </template>
          <template #icon>
            <van-radio name="1" icon-size="16"></van-radio>
          </template>
        </van-cell>
        <div class="marker" v-show="areaType === '1'  && address">
          <div class="txt" @click="showMapHandler">{{ address }}</div>
          <!-- <div class="input">周边XX公里</div> -->
          <van-field v-model="range" required label="周边" placeholder="请输入" type="number">
            <template #extra>
              <span>公里</span>
            </template>
          </van-field>
        </div>
      </van-radio-group>
    </div>

    <van-cell class="lable" title="指定性别" label="启用后只有指定性别客户可领取">
      <template #default>
        <van-switch v-model="showGender" size="22" />
      </template>
    </van-cell>
    <van-cell-group class="group" v-if="showGender">
      <div class="container">
        <van-radio-group direction="horizontal" v-model="gender">
          <van-radio name="1" icon-size="20">限男性领取</van-radio>
          <van-radio name="2" icon-size="20">限女领取</van-radio>
        </van-radio-group>
      </div>
    </van-cell-group>

    <div class="btnlist">
      <div class="btnlist-item">
        <van-button type="default" round block @click="cancelHandler">取消</van-button>
      </div>
      <div class="btnlist-item">
        <van-button type="primary" round block @click="saveHandler">确定</van-button>
      </div>
    </div>

    <van-popup v-model:show="showCityPop" position="bottom" :style="{ height: '75%' }">
      <div class="area-container">
        <van-tree-select
          height="100%"
          v-model:active-id="citys"
          v-model:main-active-index="activeIndex"
          :items="items"
        >
          <template #content>
            <div v-if="items.length">
              <van-cell
                title="全选"
                @click="selectAllHandler(items[activeIndex], items[activeIndex].children)"
                :class="{'success-icon': selectAll.includes(items[activeIndex].id)}"
              >
                <template #right-icon>
                  <van-icon name="success" v-show="selectAll.includes(items[activeIndex].id)" />
                </template>
              </van-cell>
              <van-cell
                clickable
                :title="city.text"
                v-for="(city,index) in items[activeIndex]?.children"
                :key="index"
                :class="{'success-icon': citys.includes(city.id)}"
                @click="checkedCity(city.id, items[activeIndex])"
              >
                <template #right-icon>
                  <van-icon name="success" v-show="citys.includes(city.id)" />
                </template>
              </van-cell>
            </div>
          </template>
        </van-tree-select>
        <div class="btn">
          <van-button type="danger" round block @click="saveCityHandler">确定</van-button>
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="showMapPop" position="bottom" :style="{ height: '85%' }">
      <div class="area-container">
        <div id="map" class="map"></div>
        <div class="address">
          <div>坐标：{{ lnglat.lng ? (lnglat.lng + '，' + lnglat.lng) : (positionErr || '正在读取您的位置') }}</div>
          <div>地址：{{ address || positionErr || '正在读取您的位置' }}</div>
        </div>
        <div class="btn">
          <van-button type="danger" round block @click="showMapPop = false">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts" src="./Advanced">

</script>
<style lang="scss" >
.lable {
  .van-cell__label {
    // white-space: nowrap;
  }
  .van-radio {
    margin: 4px;
    display: block;
  }
}
</style>
<style scoped lang="scss">
.marker {
  margin: 0 16px;
  border-bottom: 1px solid #eee;
  .txt {
    padding: 10px;
    background: #f8f8f8;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-bottom: 8px;
  }
}
.map {
  border: 10px solid #fff;
  height: 100%;
  // width: 100%;
  box-sizing: border-box;
  position: relative;
}

.address {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  background: #ffffffdd;
  padding: 10px;
  z-index: 10;
  line-height: 20px;
  border-radius: 8px;
  box-shadow: #ccc 0 2px 5px;
}
.area-container {
  height: 100%;
  position: relative;
  padding-bottom: 60px;
  box-sizing: border-box;
  .btn {
    position: fixed;
    padding: 8px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.success-icon {
  color: red;
}
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