/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2020-12-08 02:06:10
 * @LastEditors: 侯兴章
 * @Description:  基础的API 服务，各业务层的服务请在业务模块里编写。
 */

import http from './http/index';
import { DTOActivity, RequeryActivity } from '@/service/appModel';
 

import { EApi } from './api';
import { BaseResponseModel, BaseRequestModel } from '@/service/baseModel';

// 活动查询

export const ServGetActivity = async (params: any): Promise<DTOActivity> => {
    debugger
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const res = await http.get(EApi.getActivity, params);
    console.log(res)
    return res.data;
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