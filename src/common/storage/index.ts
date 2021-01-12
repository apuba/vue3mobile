/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-05 00:44:19
 * @LastEditTime: 2020-11-12 21:17:00
 * @LastEditors: 侯兴章
 * @Description: 
 */
/**
 * 统一封装对外的接口
 */

interface UseStoreType {
    set: Function;
    get: Function;
    remove: Function;
    clear: Function;
    setExpire?: Function;
    getExpire?: Function;
}

export default (store?: string): UseStoreType => {
    let UseStore;
    switch (store) {
        case 'session':
            UseStore = require('./sessionstorage').SessionStorageAPI;
            break;
        case 'cookie':
            UseStore = require('./cookie').CookieAPI;
            break;
        case 'localstorage':
            UseStore = require('./localstorage').LocalStorageAPI;
            break;
        default:
            UseStore = require('./localstorage').LocalStorageAPI;
            break;
    }
    return new UseStore();
};
