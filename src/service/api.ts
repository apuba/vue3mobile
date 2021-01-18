/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 03:14:17
 * @LastEditTime: 2021-01-18 19:38:17
 * @LastEditors: 侯兴章
 * @Description: 
 */

export enum EApi {
    getActivity = '/wxServer/activity/findPagination', // 获取活动列表
    saveActivity = "/wxServer/activity/saveActivity", // 创建活动
    findDictData = "/wxServer/dict/findDictData",
    getAdminList = '/wxServer/sc/getAdminList'

}