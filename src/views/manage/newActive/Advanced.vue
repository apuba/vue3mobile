<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-14 21:08:13
 * @LastEditTime: 2021-03-22 03:08:08
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
        <van-cell class="lable" title="区域模式" is-link :label="cityLable" @click="areaType='0'">
          <template #icon>
            <van-radio name="0" icon-size="16"></van-radio>
          </template>
          <template #default>
            <span @click="showCityPop=true">请选择</span>
          </template>
        </van-cell>
        <van-cell
          class="lable"
          title="范围模式"
          value="请选择"
          is-link
          :label="address"
          @click="areaType='1'"
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
          <van-radio name="0" icon-size="20">限男性领取</van-radio>
          <van-radio name="1" icon-size="20">限女领取</van-radio>
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
                @click="selectAllHandler(items[activeIndex].id, items[activeIndex].children)"
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
          <van-button type="danger" round block @click="confirmHandler">确定</van-button>
        </div>
      </div>
    </van-popup>

    <div id="map" style="width:500px; height:300px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref, toRefs } from 'vue'
import { Cell, CellGroup, Switch, Icon, Radio, RadioGroup, Button, TreeSelect, Popup } from 'vant';
import { areaList } from '@/common/static/area';
import { arrayToTreeHelper, IMapToTree } from '@/common/helper/arrayToTreeHelper';
import { ServeGetCityList } from '@/service/appService';
import _ from 'lodash';

// // 引入高德地图
// import aMap from 'vue-amap';
import MapLoader from '@/common/lib/amap'

interface Icity {
  id: string;
  name?: string;
  cityId: number;
  children: Array<Icity>;
  parentId: number;
  text: string;
  center: string;
}
interface Ilnglat { q?: number; r?: number; lng: number; lat: number }

export default defineComponent({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Switch.name]: Switch,
    [Icon.name]: Icon,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Button.name]: Button,
    [TreeSelect.name]: TreeSelect,
    [Popup.name]: Popup
  },
  setup() {

    const openAdvanced = ref(inject('openAdvanced'));
    const refState = reactive({
      showArea: false,  // 
      showGender: false,
      showCityPop: false, // 城市选择弹窗
      areaType: '-1', // 指定区域类型
      gender: -1, // 性别
      items: [] as Array<Icity>, // 城市数据
      citys: [] as Array<string>, // 选择的城市
      activeIndex: 0,
      selectAll: [] as Array<string>, // 全选按钮
      provinces: [] as Array<{ id: string; text: string }>, // 已选的省份
      lnglat: {} as Ilnglat,
      address: '', // 地图选择的地址
      cityLable: '',

    })

    const methods = {
      confirmHandler: () => {
        refState.showCityPop = false;
        const lable: string[] = [];
        refState.provinces.forEach(item => {
          lable.push(item.text + (refState.selectAll.includes(item.id) ? '' : '(部分城市)'));
        })
        refState.cityLable = lable.join('、');

      },
      cancelHandler: () => {
        openAdvanced.value = false;
      },
      checkedCity: (id: string, parent: Icity) => {
        const idIndex = refState.citys.indexOf(id);
        if (idIndex === -1) {
          refState.citys.push(id);
          // 判断是否所有省份里的城市都被选中了？
          const notHasCity = parent.children.every(item => refState.citys.includes(item.id));
          if (notHasCity) {
            refState.selectAll.push(parent.id); // 添加全选按钮
            // return
          }
        } else {
          refState.citys.splice(idIndex, 1); // 移除城市
          const selectAllIndex = refState.selectAll.indexOf(parent.id);
          selectAllIndex > -1 && refState.selectAll.splice(selectAllIndex, 1); // 移除全选按钮
        }

        const pIndex = _.findIndex(refState.provinces, item => item.id === parent.id); // refState.provinces.indexOf(parent.text);
        // 当前省份是否有已选中的城市
        const hascity = parent.children.some(item => refState.citys.includes(item.id));
        // debugger
        if (hascity && pIndex === -1) {
          refState.provinces.push({ text: parent.text, id: parent.id }); // 存入省份
        } else if (!hascity) {
          refState.provinces.splice(pIndex, 1);
        }
        console.log('当前省份', refState.provinces)
      },
      selectAllHandler: (id: string, children: Icity[]) => {
        const idIndex = refState.selectAll.indexOf(id);
        const citys: string[] = children.map(item => item.id);
        if (idIndex === -1) {
          refState.selectAll.push(id);
          // refState.citys = [...refState.citys, ...citys]
          citys.forEach(adCode => {
            !refState.citys.includes(adCode) && refState.citys.push(adCode);
          })

        } else {
          refState.selectAll.splice(idIndex, 1); // 移除全选按钮
          refState.citys = _.remove(refState.citys, item => !citys.includes(item)); // 移除已选择的城市
          const provincesIndex = _.findIndex(refState.provinces, item => item.id === id);
          refState.provinces.splice(provincesIndex, 1); // 移除已选择的省份
        }
        console.log(refState.selectAll)
        console.log(refState.citys)
      }
    }

    onMounted(() => {

      MapLoader(['AMap.Geocoder']).then((mapRes) => {
        const map = new window.AMap.Map('map', {
          // center: [108.366543, 22.817002],
          resizeEnable: true,
          zoom: 13
        })
        const geocoder = new window.AMap.Geocoder({
          city: "010", //城市设为北京，默认：“全国”
          radius: 1000 //范围，默认：500
        });

        const marker = new window.AMap.Marker({
          // 设置是否可以拖拽
          draggable: true,
          cursor: 'move',
          offset: new window.AMap.Pixel(-9, -33),
          // 设置拖拽效果
          // raiseOnDrag: true,
          // position: new window.AMap.LngLat(lng, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: '您当前位置'
        });

        // 获取地图地址
        const getAddress = (lng: number, lat: number) => {
          geocoder.getAddress([lng, lat], function (status: string, result: any) {
            if (status === 'complete' && result.regeocode) {
              const address = result.regeocode.formattedAddress;
              console.log(address);
              refState.address = address;
            } else {
              console.error('根据经纬度查询地址失败',)
            }
          });
        }

        // 更新标记点
        const updateMarker = (lng: number, lat: number) => {
          marker.setPosition([lng, lat]);
          map.add(marker); // 添加标记到地图中心
          getAddress(lng, lat);
          refState.lnglat = { lng, lat }
          console.log(refState.lnglat);
        }

        // 点击地图
        map.on('click', (e: any) => {
          const lng = e.lnglat.getLng();
          const lat = e.lnglat.getLat();
          // map.panTo([lng, lat]);
          updateMarker(lng, lat);
        });

        // 标记点拖动
        marker.on('dragend', (data: any) => {
          const { lng, lat } = data.lnglat;
          map.panTo([lng, lat]); // 地图移动
          getAddress(lng, lat);
        });

        const onComplete = (data: any) => {
          const { lng, lat } = data.position;
          map.panTo([lng, lat]); // 地图移动
          updateMarker(lng, lat);
        }

        const onError = (data: any) => {
          // 定位出错
          console.log('获取定位错误', data)
        }
        map.plugin('AMap.Geolocation', function () {
          const geolocation = new window.AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new window.AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB',
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          })

          geolocation.getCurrentPosition(function (status: string, result: any) {
            if (status == 'complete') {
              onComplete(result)
            } else {
              onError(result)
            }
          });

        })
      })
      ServeGetCityList({
        pageIndex: 1,
        pageRows: 10000,
        params: {

        }
      }).then(res => {
        const list = arrayToTreeHelper<Icity>(res.data, { id: 'cityId', pId: 'parentId' });
        console.log(list)
        refState.items = list;
      })
    })
    return { ...toRefs(refState), ...toRefs(methods) }
  }
})
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