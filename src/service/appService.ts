/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2021-02-04 00:41:27
 * @LastEditors: 侯兴章
 * @Description:  基础的API 服务，各业务层的服务请在业务模块里编写。
 */

import http from './http/index';
import { DTOActivity, IAvaterModel, IcreateOrder, IuserInfo } from '@/service/appModel';
import { EApi } from './api';
import { BaseRequestModel } from '@/service/baseModel';
import { IUpdateActivityStatus } from '@/service/appModel';


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
export const ServAgentSinge = async (url: string = window.location.href.split('#')[0]) => {
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
        jsApiList: ['selectExternalContact', 'selectEnterpriseContact'], //必填
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
// 签名
export const ServSinge = async (url: string = window.location.href.split('#')[0]) => {
    const res = await http.get(EApi.getJssdkSign, { params: { url } });
    if (!res.data) {
        return null;
    }
    window.wx.config({
        beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appid, // 必填，企业微信的corpID
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'selectEnterpriseContact', 'selectExternalContact', 'getCurExternalContact', 'openUserProfile', 'chooseImage'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    });
    window.wx.ready(function (res: any) {
        console.log('wx.ready 完成')
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。



    });

    window.wx.error(function (res: any) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log('微信签名失败------------------------------------', res)
    });
    return {
        singe: res.data,
        wx: window.wx
    }
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

// 登录服务
export const ServWechatLogin = async (requestType: string, url = window.location.href.split('#')[0]) => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const res = await http.get(EApi.wechatLogin, { params: { url, requestType } });
    console.log('获取到微信的授权地址', res.data.oauth2Url)
    window.location.href = res.data.oauth2Url;
}

// 登录服务获取用户信息及token
export const ServLogin = async (params: any): Promise<IuserInfo> => {
    const mapper = ['name', { avatar: 'headUrl' }, 'headUrl', 'isUndertaker', 'memberId', 'enterId', 'inviteesId', 'qyUserId', 'qyMemberType', 'externalUserid', 'puserid', 'token']
    const res = await http.post(EApi.login, params, mapper);
    return new Promise((resolve, rejest) => {
        if (!res.data) {
            rejest('登录失败------')
        } else {
            const userInfo = res.data[0] as IuserInfo;
            window.localStorage.token = userInfo.token; // 写入token信息;
            window.localStorage.userInfo = JSON.stringify(userInfo); // 写入token信息;
            resolve(userInfo)
        }
    })
}

// 获取企业信息
export const ServGetEnteInfo = async () => {
    return await http.get(EApi.getEnteInfo, {});

}

// 获取会员信息
export const ServGetMemberInfo = async () => {
    const res = await http.get(EApi.getMemberInfo, {});
    window.localStorage.userInfo = JSON.stringify(res.data); // 写入token信息;
    return res.data
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

// 获取数据字典
/* export const ServiceGetDict = async () => {
    const mapper = ['dictType', 'dictSort', 'dictValue', { dictLabel: 'dictLabel' }]
    const res = await http.post(ApiAPP.getDictList, {params:"",pageIndex:1,pageRows: 10000});

    appStore.commitAddDictList(res.data);
}  */