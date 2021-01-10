/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-16 23:15:14
 * @LastEditTime: 2020-11-22 04:21:17
 * @LastEditors: 侯兴章
 * @Description: 基础请求参数及返回报文模型，请根据实际团队进行修改配置
 */


/* 基础请求参数模型 */
export interface BaseRequestModel<T = any> {
    params: T; // 
    pageIndex?: number;
    pageRows?: number;
}

/* 基础请求响应报文模型 */
export interface BaseResponseModel<T = any> {
    msg: string;
    code: number;
    data: T;
    total?: number;
}


