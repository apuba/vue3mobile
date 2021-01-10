/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 22:54:42
 * @LastEditTime: 2020-12-08 02:06:10
 * @LastEditors: 侯兴章
 * @Description:  基础的API 服务，各业务层的服务请在业务模块里编写。
 */

import http from '@/common/http/index.ts';
import { DTOlogin, IModelUserInfo, IModelDict } from '@/service/appModel';
import { arrayToTreeHelper, MapToTree } from '@/common/helper/arrayToTreeHelper';
import { mapUserInfo } from '@/mapper/config'; // IModelUserInfo 与后端实际返回的报文数据映射
import { Menu } from '@/router/types';
import { ApiAPP } from './api';
import { appStore } from '@/store/modules/appStore';
// 登录服务
export const ServiceLogin = async (params: DTOlogin): Promise<IModelUserInfo> => {
    // mapUserInfo 为 IModelUserInfo 与后端实际返回的报文数据映射
    const res = await http.post(ApiAPP.login, params, mapUserInfo);
    return res.data[0];
}

// 获取菜单 
export const ServiceGetMenus = async (): Promise<Array<Menu>> => {
    const res = await http.post(ApiAPP.getMenuList, {});
    const mapper: MapToTree = {
        id: 'menuId',
        pId: 'menuParentId'
    }
    const data: Menu[] = arrayToTreeHelper(res.data, mapper); // 获取树型数据
    return data
}

// 获取数据字典
export const ServiceGetDict = async () => {
    const mapper = ['dictType', 'dictSort', 'dictValue', { dictLabel: 'dictLabel' }]
    const res = await http.post(ApiAPP.getDictList, {params:"",pageIndex:1,pageRows: 10000});
 
    appStore.commitAddDictList(res.data);
}