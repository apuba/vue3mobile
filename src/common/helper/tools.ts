/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-23 20:00:16
 * @LastEditTime: 2021-03-24 21:02:58
 * @LastEditors: 侯兴章
 * @Description: 
 */

export const loadScript = (url: string, callback: Function, params: any) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = url
    document.head.appendChild(script)

    script.onload = function () {
        callback && callback(params)
    }

    /*     // 判断js是否已经加载成功
        if (script.readyState) {
            // IE
            script.onreadystatechange = function () {
                if (script.readyState === 'complete' || script.readyState === 'loaded') {
                    script.onreadystatechange = null
                    callback && callback(params)
                }
            }
        } else {
            // 非IE
            script.onload = function () {
                callback && callback(params)
            }
        } */
}

export const loadCss = (url: string) => {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url
    head.appendChild(link)
}

// 获取 URL参数
export const getURLParams = (name: string) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    // reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}


/**
 * @description:  计算两经纬度点之间的距离(单位：米)
 * @param {number} lng1
 * @param {number} lat1
 * @param {number} lng2
 * @param {number} lat2
 * @return {*}
 */
export const lnglatDistance = (lng1: number, lat1: number, lng2: number, lat2: number) => {
    const radLat1 = lat1 * Math.PI / 180.0;
    const radLat2 = lat2 * Math.PI / 180.0;
    const a = radLat1 - radLat2;
    const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10;
    return s
}

