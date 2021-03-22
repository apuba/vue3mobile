/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-22 21:26:02
 * @LastEditTime: 2021-03-23 01:04:58
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { defineComponent, inject, onMounted, PropType, reactive, ref, toRefs } from 'vue'
import { Cell, CellGroup, Switch, Icon, Radio, RadioGroup, Button, TreeSelect, Popup, Field, Toast } from 'vant';
import { areaList } from '@/common/static/area';
import { arrayToTreeHelper, IMapToTree } from '@/common/helper/arrayToTreeHelper';
import { ServeGetCityList } from '@/service/appService';
import { Icity, Ilnglat, ImapConfig, Irule, Irules } from './Iadvanced';
import _ from 'lodash';

// // 引入高德地图
// import aMap from 'vue-amap';
import MapLoader from '@/common/lib/amap'

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
        [Popup.name]: Popup,
        [Field.name]: Field
    },
    props: {
        rules: {
            type: Object as PropType<Irules>
        }
    },
    setup(props, context) {

        const openAdvanced = ref(inject('openAdvanced'));
        const setActivityRules = inject('setActivityRules') as Function;

        const refState = reactive({
            showArea: false,  // 
            showGender: false,
            showCityPop: false, // 城市选择弹窗
            showMapPop: false, // 地图选择弹窗
            areaType: '-1', // 指定区域类型
            gender: '1', // 性别
            items: [] as Array<Icity>, // 城市数据
            citys: [] as Array<string>, // 选择的城市
            activeIndex: 0,
            selectAll: [] as Array<string>, // 全选按钮
            provinces: [] as Array<{ id: string; text: string, isAll?: boolean }>, // 已选的省份
            lnglat: {} as Ilnglat,
            address: '', // 地图选择的地址
            cityLable: '',
            positionErr: '', // 定位失败的提示
            range: 10, //周边多少公里 
        })

        const methods = {
            // 显示地图
            showMapHandler: () => {
                refState.showMapPop = true;
                // 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor'

                MapLoader(['AMap.Geocoder', 'AMap.PlaceSearch']).then((mapRes) => {
                    const mapConfig: ImapConfig = {
                        resizeEnable: true,
                        zoom: 13
                    }

                    if (refState.lnglat.lng) {
                        mapConfig.center = [refState.lnglat.lng, refState.lnglat.lat]
                    }

                    const map = new window.AMap.Map('map', mapConfig)
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
                                // const {city,district,township,neighborhood } = result.regeocode.addressComponent;
                                refState.address = address;
                                console.log(refState.address);
                            } else {
                                console.error('根据经纬度查询地址失败',)
                                refState.positionErr = '根据经纬度查询地址失败'
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
                        console.log('点击了地图')
                        refState.address = '';
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
                        console.log('获取定位错误', data);
                        refState.positionErr = '定位失败，请手动选择'
                    }
                    map.plugin('AMap.Geolocation', function () {
                        const geolocation = new window.AMap.Geolocation({
                            // 是否使用高精度定位，默认：true
                            enableHighAccuracy: true,
                            // 设置定位超时时间，默认：无穷大
                            timeout: 10000,
                            buttonPosition: 'RB',    //定位按钮的停靠位置
                            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                            buttonOffset: new window.AMap.Pixel(10, 20),
                            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                            zoomToAccuracy: true,
                            //  定位按钮的排放位置,  RB表示右下

                            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                        })
                        map.addControl(geolocation);
                        geolocation.getCurrentPosition(function (status: string, result: any) {
                            if (status == 'complete') {
                                onComplete(result)
                            } else {
                                onError(result)
                            }
                        });

                    })
                })
            },

            // 保存城市范围选择
            saveCityHandler: () => {
                refState.showCityPop = false;
                const lable: string[] = [];
                refState.provinces.forEach(item => {
                    lable.push(item.text + (refState.selectAll.includes(item.id) ? '' : '(部分城市)'));
                })
                refState.cityLable = lable.join('、');
            },

            // 取消按钮
            cancelHandler: () => {
                openAdvanced.value = false;
            },
            // 确定按钮
            saveHandler: () => {
                const rulesObj: Irules = {};

                // 处理省份全选按钮
                refState.provinces.forEach(item => {
                    item.isAll = refState.selectAll.includes(item.id)
                })

                console.log('处理省份全选按钮', refState.provinces)

                if (refState.showGender) {
                    rulesObj.gender = {
                        ruleType: 'gender',
                        value: refState.gender
                    }
                }

                if (refState.showArea && refState.areaType === '0') {
                    if (!refState.citys.length) {
                        return Toast.fail('至少选择一个城市区域')
                    }
                    // 使用区域模式
                    rulesObj.map = {
                        ruleType: 'map',
                        value: refState.citys.join(','),
                        remark: JSON.stringify(refState.provinces),
                        address: refState.cityLable,
                    }
                } else if (refState.showArea && refState.areaType === '1') {
                    if (!refState.lnglat.lng || !refState.address || !refState.range) {
                        return Toast.fail('请选择范围或设置周边距离')
                    }
                    // 使用范围模式
                    rulesObj.range = {
                        ruleType: 'range',
                        center: `${refState.lnglat.lng},${refState.lnglat.lat}`,
                        value: refState.range,
                        address: refState.address,
                    }
                }

                openAdvanced.value = false;
                setActivityRules(rulesObj);
            },

            // 选中城市
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

            // 全选省份里的城市
            selectAllHandler: (city: Icity, children: Icity[]) => {
                const { id, text } = city;
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
                }

                // 处理省份
                const provincesIndex = _.findIndex(refState.provinces, item => item.id === id);


                if (idIndex === -1 && provincesIndex === -1) {
                    refState.provinces.push({ text, id }); // 存入省份
                } else if (idIndex > -1 && provincesIndex > -1) {
                    refState.provinces.splice(provincesIndex, 1); // 移除已选择的省份
                }

                console.log('全选', refState.selectAll)
                console.log('已选城市', refState.citys)
                console.log('省份', refState.provinces)
            }
        }

        // 编辑时数据回显
        const dataReappear = () => {
            const { map, gender, range } = props.rules as Irules;
            // 数据回显处理-开始
            refState.showArea = !!map || !!gender;
            if (map) {
                refState.areaType = '0'; // 区域模式
                refState.cityLable = map.address || '';
                refState.provinces = map.remark ? JSON.parse(map.remark) : [];
                refState.citys = map.value ? map.value.toString().split(',') : [];
                refState.provinces.forEach(item => {
                    item.isAll && refState.selectAll.push(item.id); // 解析全选按钮
                })
            } else if (range) {
                refState.areaType = '1'; // 范围模式
                refState.address = range.address || '';
                const center = range.center ? range.center.split(',') : [];
                if (center.length) {
                    refState.lnglat = { lng: parseFloat(center[0]), lat: parseFloat(center[1]) }
                }
            }
            if (gender && gender.value) {
                refState.showGender = true;
                refState.gender = gender.value as string;
            }
            // 数据回显结束  结束         
        }
        dataReappear();

        onMounted(() => {
            // 获取省市区数据
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