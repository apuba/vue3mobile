/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-03-20 18:52:38
 * @LastEditTime: 2021-03-22 02:19:22
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { AMAP_KEY } from '@/config'

export default function MapLoader(plugin?: string[]) {
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap)
        } else {
            let url = 'https://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=' + AMAP_KEY;
            if (plugin?.length) {
                url +='&plugin=' + plugin.join(',');
            }
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = url;
            script.onerror = reject
            document.head.appendChild(script);
            // 判断js是否已经加载成功
            // 非IE
           /*  script.onload = function () {
                resolve(window.AMap)
            } */
           
        }
        window.initAMap=()=> {
            resolve(window.AMap)
        }
    })
}