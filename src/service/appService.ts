/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2021-03-24 20:37:32
 * @LastEditors: 侯兴章
 * @Description:  基础的API 服务，各业务层的服务请在业务模块里编写。
 */

import http from './http/index';
import { DTOActivity, IAvaterModel, IcreateOrder, Ilnglat, IuserInfo } from '@/service/appModel';
import { EApi } from './api';
import { BaseRequestModel } from '@/service/baseModel';
import { IUpdateActivityStatus } from '@/service/appModel';
import { Irule, Irules } from '@/views/manage/newActive/Iadvanced';
import _ from 'lodash';
import { WX_SDK_API, WECHAT_SDK_API, WX_AGENT_API, AMAP_KEY, AMAP_WEB_KEY } from '@/config'
import jsonp from 'jsonp'

// 活动查询
export const ServGetActivity = async (params: BaseRequestModel) => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const res = await http.get(EApi.getActivity, params);
    return res.data;
}


// 获取管理员列表
export const ServGetAdminList = async (): Promise<Array<IAvaterModel>> => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const mapper = {
        name: 'userFullName',
        avatar: 'userHeadImgUrl',
        id: 'userId',
        isAdmin: 'isAdmin'
    }
    const res = await http.get(EApi.getAdminList, { params: {} }, mapper);
    return res.data;
}

// 添加应用管理员
export const ServAddAdminList = async (adminList: Array<any>) => {
    return await http.post(EApi.addAdminList, { params: { userArr: adminList } });
}


// 删除应用管理员
export const ServDelAdminList = async (adminList: Array<any>) => {
    return await http.post(EApi.delAdminList, { params: { userArr: adminList } });
}

export const ServGetUndertaker = async (params: BaseRequestModel) => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const res = await http.get(EApi.getUndertaker, params);
    return res.data;
}

// 查询活动承接人
export const ServGetFollowUserList = async () => {
    const res = await http.get(EApi.getFollowUserList, {});
    return res.data
}

// 文件上传
export const ServfileUpload = async (formData: FormData) => {
    return await http.uploadFiles(EApi.fileUpload, formData)
}

// 查询订单号
export const ServGetOrderHeader = async (orderCode: string) => {
    return await http.get(EApi.getOrderHeader, { params: { orderCode } })
}

// 应用签名
export const ServAgentSign = async (url: string = window.location.href.split('#')[0]) => {
    const res = await http.get(EApi.getAppJsapiTicket, { params: { url } });
    if (!res.data) {
        return null;
    }
    window.wx.agentConfig({
        corpid: res.data.appid, // 必填，企业微信的corpid，必须与当前登录的企业一致
        agentid: res.data.agentid, // 必填，企业微信的应用id （e.g. 1000247）
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: WX_AGENT_API, //必填
        success: function (res: any) {
            // 回调
            console.log('agentConfig 签名 成功 ')
        },
        fail: function (res: any) {
            if (res.errMsg.indexOf('function not exist') > -1) {
                alert('版本过低请升级')
            }
            console.log('agentConfig签名失败----------------------------', res)
        }
    });
    return res

}

// 微信企业签名
export const ServWxSign = async (url: string = window.location.href.split('#')[0]) => {

    return new Promise(async (resolve, reject) => {
        const res = await http.get(EApi.getWxSign, { params: { url } });
        if (!res.data) {
            return null;
        }
        window.wx.config({
            beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appid, // 必填，企业微信的corpID
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: WX_SDK_API// 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
        window.wx.ready(function (res: any) {
            resolve({
                singe: res.data,
                wx: window.wx
            })
            console.log('wx.ready 完成')
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });

        window.wx.error(function (res: any) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            console.log('微信签名失败------------------------------------', res)
            reject('微信签名失败')
        });

    })

}


// 微信公众号签名
export const ServWechatSign = async (url: string = window.location.href.split('#')[0]) => {

    return new Promise(async (resolve, reject) => {
        const sign = await http.get(EApi.getWechatSign, { params: { url } });
        if (!sign.data) {
            return null;
        }
        window.wx.config({
            beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: sign.data.appid, // 必填，企业微信的corpID
            timestamp: sign.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: sign.data.nonceStr, // 必填，生成签名的随机串
            signature: sign.data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: WECHAT_SDK_API // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
        window.wx.ready(function (res: any) {
            resolve({
                singe: sign.data,
                wx: window.wx
            })
            console.log('wx.ready 完成')
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });

        window.wx.error(function (res: any) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            console.log('微信签名失败------------------------------------', res)
            reject('微信签名失败')
        });

    })

}

// 获取定位
export const ServGetLoation = async () => {
    return new Promise((resolve, reject) => {
        window.wx.getLocation({
            type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (info: any) {
                console.log("微信定位成功", info);
                resolve(info);
            },
            fail: function (err: any) {
                console.log("微信定位失败", err);
                reject(err);
            },

        })
    })
}

// 根据经纬度获取城市信息
export const ServGetCityInofByLnglat = (point: Ilnglat) => {
    return new Promise((reslove, reject) => {
        const apiUrl = 'https://restapi.amap.com/v3/geocode/regeo';
        jsonp(apiUrl + '?key=' + AMAP_WEB_KEY + '&location=' + point.lng + ',' + point.lat + '&output=json', null, (err: any, data: any) => {
            if (err) {
                console.error(err.message);
                reject(err)
            } else {
                reslove(data.regeocode)
            }
        });

    })

}

/**
 * @description: 获取当前定位城市信息，把微信经纬度自动转换后通过高德服务获城市信息
 * @param {Ilnglat} point 微信经纬度
 * @return {*}
 */
export const ServGetCityInfo = (point: Ilnglat) => {
    return new Promise((reslove, reject) => {
        SerTransformLnglat(point).then(lnglat => {
            ServGetCityInofByLnglat(lnglat).then(cityInfo => reslove(cityInfo)).catch(err => reject(err));
        })
    })
}
// 坐标经纬度转化，微信经纬度转为高德经纬度
export const SerTransformLnglat = (point: Ilnglat): Promise<Ilnglat> => {
    const apiUrl = 'https://restapi.amap.com/v3/assistant/coordinate/convert?';
    return new Promise((reslove, reject) => {
        jsonp(apiUrl + 'key=' + AMAP_WEB_KEY + '&coordsys=gps&locations=' + point.lng + ',' + point.lat, null, (err: any, data: any) => {
            console.log('坐标转换结果', data)
            if (err) {
                console.error(err.message);
                reject(err)
            } else {
                const lnglat = data.locations.split(',')
                reslove({ lng: lnglat[0], lat: lnglat[1] })
            }
        });

    })
}



// 创建订单
export const ServcreateOrder = async (params: IcreateOrder) => {
    return http.post(EApi.createOrder, { params })
}

export const ServSaveActivity = async (params: any) => {
    return http.post(EApi.saveActivity, { params })
}

// 获取流水
export const ServFindCapitalFlow = async (params: BaseRequestModel) => {
    return http.get(EApi.findCapitalFlow, params);
}

// 微信公众号授权登录  state:is_wx_login   参数用于在登录页面识别公众号与企业微信登录接口返回 
export const ServWxLogin = async (redirectUri = window.location.href.split('#')[0], state: string = 'is_wx_login') => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    // TODO 清除 公众号自定参数state
    const res = await http.get(EApi.wxLogin, { params: { redirectUri, state } });
    console.log('获取到微信公众号的授权地址', res.data.authUrl)
    // window.location.href = res.data.authUrl;
    return res
}

// 企业微信授权登录服务
export const ServWechatLogin = async (requestType: string, url = window.location.href.split('#')[0]) => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    debugger
    //TODO: 清除 公众号自定参数state
    const res = await http.get(EApi.wechatLogin, { params: { url, requestType } });
    console.log('获取到企业微信的授权地址', res.data.oauth2Url)
    window.location.href = res.data.oauth2Url;
}

// 登录服务获取用户信息及token
export const ServLogin = async (params: any): Promise<IuserInfo> => {
    const res = await http.post(EApi.login, params);
    return new Promise((resolve, rejest) => {
        if (!res.data) {
            rejest('登录失败------')
        } else {
            res.data.isUndertaker = res.data.undertaker;

            const userInfo = res.data as IuserInfo;
            console.log('用户登录成功结果', userInfo)
            userInfo.headUrl && (userInfo.avatar = userInfo.headUrl);
            window.sessionStorage.token = userInfo.token; // 写入token信息;
            window.sessionStorage.userInfo = JSON.stringify(userInfo); // 写入token信息;
            resolve(userInfo)
        }
    })
}

// 获取企业信息
export const ServGetEnteInfo = async () => {
    return await http.get(EApi.getEnteInfo, {});
}

// 获取会员信息
export const ServGetMemberInfo = async (params?: any) => {
    const res = await http.get(EApi.getMemberInfo, { params });
    res.data.isUndertaker = res.data.undertaker;
    window.sessionStorage.userInfo = JSON.stringify(res.data); // 写入token信息;
    return res
}

// 是否打开过红包
export const ServIsOpenHongbao = async (activityId: number) => {
    return await http.get(EApi.isOpen, { params: { activityId } });
}

// 拆红包
export const ServOpenHongbao = async (activityId: number) => {
    return await http.post(EApi.openHongbao, { params: { activityId } });
}

// 图片转base64
export const ServGetBase64Img = async (url: string) => {
    return await http.get(EApi.getBase64Image, { params: { url } });
}

// 更新活动状态
export const ServUpdateActivityStatus = async (params: IUpdateActivityStatus) => {
    return await http.post(EApi.updateActivityStatus, { params })
}

// 获取活动发放数据
export const ServGetGrantData = async (activityId: number) => {
    return await http.get(EApi.getGrantData, { params: { activityId } });
}

// 查询活动数据(新增、分享、成本、点击)
export const ServGetActivityInfo = async (activityId: number) => {
    return await http.get(EApi.getActivityInfo, { params: { activityId } });
}

// 邀请排名
export const ServGetInviteesInfo = async (params: BaseRequestModel<{ activityId: number }>) => {
    return await http.get(EApi.getInviteesInfo, params);
}

// 活动状态统计
export const ServgetCountByStatus = async () => {
    return await http.get(EApi.getCountByStatus, { params: {} });
}

// 获取活动个人二维码
export const ServGetActivityQrcode = async (activityId: number, undertakerId: number) => {
    return await http.get(EApi.getActivityQrcode, { params: { activityId, undertakerId } });
}


interface qrCode {
    inviteesId: number
    activityId: number
}
// 获取 活动二维码，有分享者与新用户关联关系
export const ServCreateTempQrcode = async (params: qrCode) => {
    return await http.get(EApi.createTempQrcode, { params });
}

// 获取当前用户已邀请的成员列表
export const ServGetInvitessList = async (params: { activityId: number }) => {
    return await http.get(EApi.getInvitessList, { params })
}


// 根据活动ID查询企业信息
export const ServGetEnterInfoByActivityId = async (params: { activityId: number }) => {
    return await http.get(EApi.getEnterInfoByActivityId, { params })
}

// 更新点击次数
export const ServUpdateClick = async (activityId: number) => {
    return await http.post(EApi.updateClick, { params: { activityId } })
}

// 获取微信服务
export const ServeGetCityList = (params: BaseRequestModel<{ adcode?: string, level?: number, levels?: number }>) => http.get(EApi.getCityList, params,
    ['cityId', 'parentId', 'center', { text: 'name', id: 'adcode' }])

// 获取活动规则（高级设置）
export const ServeGetActivityRule = async (activityId: number | string): Promise<Irules> => {
    const res = await http.get(EApi.getActivityRules, { params: { activityId } });
    let rules: Irules = {};
    if (res.code === 200) {
        const data: Array<Irule> = res.data;
        const gender = _.find(data, item => item.ruleType === 'gender');
        const map = _.find(data, item => item.ruleType === 'map');
        const range = _.find(data, item => item.ruleType === 'range');
        rules = {
            gender,
            map,
            range
        };

    }
    return rules;
};


// 获取数据字典
/* export const ServiceGetDict = async () => {
    const mapper = ['dictType', 'dictSort', 'dictValue', { dictLabel: 'dictLabel' }]
    const res = await http.post(ApiAPP.getDictList, {params:"",pageIndex:1,pageRows: 10000});

    appStore.commitAddDictList(res.data);
}  */