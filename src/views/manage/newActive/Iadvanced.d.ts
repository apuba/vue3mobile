/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-22 18:55:04
 * @LastEditTime: 2021-03-22 21:25:20
 * @LastEditors: 侯兴章
 * @Description: 
 */


// 城市模型
export interface Icity {
    id: string;
    name?: string;
    cityId: number;
    children: Array<Icity>;
    parentId: number;
    text: string;
    center: string;
}

// 经纬度模型
export interface Ilnglat { q?: number; r?: number; lng: number; lat: number }


// 地图配置模型
export interface ImapConfig {
    resizeEnable: boolean;
    zoom: number;
    center?: Array<number>;
}

// 规则模型
export interface Irule {
    ruleId?: number;
    activityId?: number;
    ruleType: string;
    value: string | number;
    address?: string;
    center?: string;
    remark?: string;
}
// 规则模型
export interface Irules { 
    range?: Irule; 
    map?: Irule; 
    gender?: Irule }