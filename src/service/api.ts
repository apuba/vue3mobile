/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 03:14:17
 * @LastEditTime: 2021-01-25 22:18:00
 * @LastEditors: 侯兴章
 * @Description: 
 */

export enum EApi {
    getActivity = '/wxServer/activity/findPagination', // 获取活动列表
    saveActivity = "/wxServer/activity/saveActivity", // 创建活动
    findDictData = "/wxServer/dict/findDictData", // 数据字典查询
    getAdminList = '/wxServer/sc/getAdminList',
    getUndertaker = '/wxServer/member/getUndertaker', // 查询活动承接人
    fileUpload = '/wxServer/fileUpload/imgUpload', // 上传文件
    getFollowUserList = '/wxServer/sc/getFollowUserList', // 查询所有承接人
    getJssdkSign = '/wxServer/sign/getJssdkSign',// 微信签名
    createOrder ='/wxServer/order/createOrder', // 充值
    findCapitalFlow ='/wxServer/capitalFlow/findCapitalFlow', // 资金流水
    getOrderHeader ='/wxServer/order/getOrderHeader', // 订单查询
    getAppJsapiTicket ='/wxServer/sign/getAppJsapiTicket', // 应用签名
}