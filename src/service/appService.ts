/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2021-01-22 00:52:54
 * @LastEditors: 侯兴章
 * @Description:  基础的API 服务，各业务层的服务请在业务模块里编写。
 */

import http from './http/index';
import { DTOActivity, IAdminModel, IcreateOrder } from '@/service/appModel';


import { EApi } from './api';
import { BaseRequestModel } from '@/service/baseModel';
import { withCtx } from 'vue';

// 活动查询
export const ServGetActivity = async (params: BaseRequestModel) => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const res = await http.get(EApi.getActivity, params);
    return res.data;
}



// 获取管理员列表
export const ServGetAdminList = async (): Promise<Array<IAdminModel>> => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const res = await http.get(EApi.getAdminList, {});
    return res.data;

    // const data: Array<IAdminModel> = [
    //     {
    //         "name": "小兔云科技",
    //         "avatar": "http://wework.qpic.cn/bizmail/ZbUGTTE029O4kBoictIrqf9zicrl6EwDrLOUn98BSMt9maibfvX1IB5Bg/0",
    //         "userid": "XiaoTuYunKeJi"
    //     },
    //     {
    //         "name": "黄飞华",
    //         "avatar": "https://wework.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDhhACsdmwicY0p9c0yu9Lf3AnxEEtrRZfzmxzNAic4tDEQag9xOwHC9Lk/0",
    //         "userid": "HuangYouZheng"
    //     },
    //     {
    //         "name": "张力",
    //         "avatar": "http://wework.qpic.cn/bizmail/6RUxnuWf0MVX8IfokOUsnnRHvWL3Vqbx7AQahCraRXlGaQdvJjVEnQ/0",
    //         "userid": "mr"
    //     }
    // ]
    // return data
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

// 签名
export const ServSinge = async (url: string = window.location.href.split('#')[0]) => {
    const res = await http.get(EApi.getJssdkSign, { params: { url } })
    return res.data
}

// 创建订单
export const ServcreateOrder = async (params: IcreateOrder) => {
    return http.post(EApi.createOrder, { params })
}


// 获取流水
export const ServFindCapitalFlow = async (params: BaseRequestModel) => {
    return http.get(EApi.findCapitalFlow, params);
}


// 登录服务
/* export const ServiceLogin = async (params: DTOlogin): Promise<IModelUserInfo> => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const res = await http.post(EApi.login, params, mapUserInfo);
    return res.data[0];
} */


// 获取数据字典
/* export const ServiceGetDict = async () => {
    const mapper = ['dictType', 'dictSort', 'dictValue', { dictLabel: 'dictLabel' }]
    const res = await http.post(ApiAPP.getDictList, {params:"",pageIndex:1,pageRows: 10000});

    appStore.commitAddDictList(res.data);
}  */