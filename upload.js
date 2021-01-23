/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-23 22:06:17
 * @LastEditTime: 2021-01-24 01:59:29
 * @LastEditors: 侯兴章
 * @Description: 
 */
/* eslint-disable  */
"use strict";
// 引入scp2 记得要安装
var client = require("scp2");
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require("ora");
const chalk = require("chalk");
const spinner = ora(chalk.green("正在发布到ftp服务器..."));
spinner.start();

client.scp(
  "./dist/", // 本地打包文件的位置
  {
 
  },
  (err) => {
    spinner.stop();
    if (!err) {
      console.log(chalk.green("项目发布完毕!"));
    } else {
      console.log("err", err);
    }
  }
);
