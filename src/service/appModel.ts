/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-17 00:46:00
 * @LastEditTime: 2020-12-08 02:23:55
 * @LastEditors: 侯兴章
 * @Description: 
 */


/* 用户登录对象 */
export interface DTOlogin {
    userName: string;
    password: string;
    authCode?: string | number;
}

// 用户信息模型
export interface IModelUserInfo {
    id: string | number;
    name: string;
    photo: string;
    roles?: Array<string | number>;
    email?: string;
    token: string;
    jobName?: string;
}

// 字典的数据模型
export interface IModelDict {
    dictType: string; // 字典类型
    dictValue: string | number; // 字典的值
    dictLabel: string;  // 字典的文本
    dictSort: number;
}


//字典数据选项
export interface IDictOptions {
    value: string | number;
    label: string;
    disabled?: boolean;
    key?: string | number;
    title?: string;
}

