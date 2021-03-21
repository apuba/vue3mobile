/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-22 03:14:17
 * @LastEditTime: 2021-02-02 00:34:20
 * @LastEditors: 侯兴章
 * @Description: 
 */

export enum EApi {
    getActivity = '/wxServer/activity/findPagination', // 获取活动列表
    saveActivity = "/wxServer/activity/saveActivity", // 创建活动
    findDictData = "/wxServer/dict/findDictData", // 数据字典查询

    getAdminList = '/wxServer/enter/getAdmin', // 管理列表
    addAdminList = '/wxServer/enter/addAdmin', //添加管理员
    delAdminList = '/wxServer/enter/delAdmin', // 删除管理员

    getUndertaker = '/wxServer/member/getUndertaker', // 查询活动承接人
    fileUpload = '/wxServer/fileUpload/imgUpload', // 上传文件
    getFollowUserList = '/wxServer/sc/getFollowUserList', // 查询所有承接人
    getJssdkSign = '/wxServer/sign/getJssdkSign',// 微信签名
    createOrder = '/wxServer/order/createOrder', // 充值
    findCapitalFlow = '/wxServer/capitalFlow/findCapitalFlow', // 资金流水
    getOrderHeader = '/wxServer/order/getOrderHeader', // 订单查询
    getAppJsapiTicket = '/wxServer/sign/getAppJsapiTicket', // 应用签名
    wechatLogin = '/wxServer/sc/getOauth2', // 企业微信授权登录
    wxLogin = '/wxServer/wechat/getAuthUrl', // 微信公众号授权登录
    login = '/wxServer/baseLogin/mLogin', // 登录 获取token
    getEnteInfo = '/wxServer/enter/getEnterInfo', // 获取企业信息
    getMemberInfo = '/wxServer/member/findMember', // 获取会员信息
    isOpen = '/wxServer/red/isOpen',  // 当前进入的会员对当前红包是否有拆过
    openHongbao = '/wxServer/red/open',  // 拆红包
    getBase64Image = '/wxServer/sign/getBase64', // 把图片转为base64
    updateActivityStatus = '/wxServer/activity/updateActivity', // 更新活动状态

    getInviteesInfo = '/wxServer/member/getInviteesInfo', // 邀请排名
    getActivityInfo = '/wxServer/activity/getActivityInfo', // 查询活动数据-活动效果数据
    getGrantData = '/wxServer/activity/getGrantData', // 查询活动数据-活动发放数据
    getCountByStatus = '/wxServer/activity/getCountByStatus', // 活动状态统计
    getActivityQrcode ='/wxServer/activity/getActivityQrcode', // 获取活动个人二维码 base64
    createTempQrcode = '/wxServer/member/createTempQrcode', // 创建二维码
    getInvitessList = '/wxServer/member/getAllInviteesByInviteesId' , // 获取已邀请人列表
    getEnterInfoByActivityId='wxServer/enter/getEnterInfoByActivityId', //通过活动获取企业信息
    updateClick='/wxServer/activity/updateClickNumber', // 红包点击次数
    getCityList = '/wxServer/sysCity/getCity', // 获取城市
}