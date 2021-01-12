/*
 * @Author: 侯兴章
 * @Date: 2020-11-05 21:59:32
 * @LastEditTime: 2020-11-25 23:20:43
 * @LastEditors: 侯兴章
 * @Description: 
 */

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

export interface AxiosRequest {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: Method;
    headers?: any;
    timeout?: number;
    responseType?: ResponseType;
    mapper?: any; // 数据映射配置
}

export interface AxiosResponse {
    data: any;
    headers: any;
    request?: any;
    status: number;
    statusText: string;
    config: AxiosRequest;
}

export interface CustomResponse<T = any> {
    readonly status?: boolean;
    readonly code: number;
    readonly msg: string;
    readonly total: number;
    data: T;
    origin?: any;
}
