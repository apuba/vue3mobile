/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-12-24 22:18:17
 * @LastEditTime: 2021-01-02 01:32:58
 * @LastEditors: 侯兴章
 * @Description: 
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // style: true
      style: (name) => `${name}/style/less`,
    }, 'vant']
  ]
}
