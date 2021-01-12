/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-03 21:41:10
 * @LastEditTime: 2020-12-03 21:41:12
 * @LastEditors: 侯兴章
 * @Description: 
 */


export default {
     
    isNull: {
      reg: /\S/,
      tip: '内容不可为空'
    },
    isLetter: {
      reg: /^[a-zA-Z]+$/,
      tip: '请输入正确的英文字母!'
    },
    isDate: {
      reg: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/,
      tip: '请输入正确的日期格式!' // 验证日期格式是否为YYYY-MM-DD格式
    },
    isPhone: {
      reg: /^1[3456789]\d{9}$/,
      tip: '请输入正确的手机号'
    },
    isTel: {
      reg: /(^0\d{2}-8\d{7}$)|(^0\d{3}-3\d{6}$)/,
      tip: '请输入正确的座机号'
    },
    isEmail: {
      reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      tip: '请输入正确的邮箱'
    },
    isIdCard: {
      reg: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
      tip: '请输入正确的身份证号码'
    },
    isURL: {
      reg: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      tip: '请输入正确的URL地址'
    },
    isChinese: {
      reg: /[\u4e00-\u9fa5]/,
      tip: '请输入中文'
    }
  };
  