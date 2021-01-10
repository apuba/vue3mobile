/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-14 18:18:52
 * @LastEditTime: 2020-12-16 15:33:22
 * @LastEditors: 侯兴章
 * @Description: 
 */

import { isArray } from 'lodash';
/**
 * @description:  数据模型映射
 * @param {Array} originData 需要做映射的源数据
 * @param {any} config 映射配置表
 * @param {Array} result
 * @param {Array} children 嵌套的节点名
 * @return {*}　返回清洗后映射结果的数据, 只做对象第一层清洗，如果为嵌套的则一起清洗嵌套的数据
 */
export const mapping = <T>(originData: any | any[], config: any | any[], children: string = 'children', result: Array<T> = [], childrens?: Array<T>): Array<T> => {
    let sourceData: any[];
    const originDataIsArray = isArray(originData);
    if (originDataIsArray) {
        // 数据源是个数组
        sourceData = originData;
        if (!originData.length) {
            console.log('没有数据原')
            return [];
        }
    } else {
        // 对象 转为数组
        sourceData = [originData];
    }
    sourceData.forEach(item => {
        let obj: any = {};
        if (isArray(config)) {
            // 如果是数组, 数组形式可以为 ['a','b','c', {d: 'f'}]  其中 d转为f            
            config.map(keyObje => {
                const typ = typeof keyObje; // 获取数组值的类型
                if (typ === 'string') {
                    obj[keyObje] = item[keyObje];
                } else if (typ === 'object') {
                    Object.keys(keyObje).map(key => {
                        obj[key] = item[keyObje[key]];
                    })
                }
            })
        } else {
            // { a:'a', b: 'h1', c:'m', d:'y', e: 'e'} // key转为value
            Object.keys(config).map(key => {
                obj[key] = item[config[key]];
            })
        }

        if (childrens) {
            childrens?.push(<T>obj)
        } else {
            result.push(<T>obj)
        }

        if (item[children] && item[children].length) {
            obj[children] = [];
            mapping<T>(item[children], config, children, result, obj[children])
        }
    })
    return result;
}

export const mapperHelper = <T>(originData: any | any[], config: any | any[], children: string = 'children',) => {
    return mapping<T>(originData, config);
}