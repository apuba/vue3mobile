/*
 * @Author: 侯兴章
 * @Date: 2020-10-13 01:19:23
 * @LastEditTime: 2021-03-26 15:39:02
 * @LastEditors: 侯兴章
 * @Description: 配置
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

// 代理配置
const createProxy = () => {
  const enablePro = process.env.ENABLE_PROXY;
  if (enablePro === 'yes') {
    return {
      '/api': {
        // target: 'http://localhost:9095/api',
        target: 'http://qywx001.966006.com:9095/api',
        // target: 'http://192.168.100.8:9095/api',
        // target: 'http://47.115.141.0:9095/api',
        secure: false,
        changeOrigin: false, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': ''
        }
      }
    };
  } else {
    return null;
  }
};

module.exports = {
  // publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
  publicPath: '/',
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'public', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      // .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@public', resolve('public'))
      .set('@components', resolve('src/components'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@style', resolve('src/style'))
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          // require("postcss-pxtorem")({
          //   rootValue: 37.5, // 换算的基数,数值具体看你的设计稿 另外提醒下vant-UI的官方根字体大小是37.5
          //   selectorBlackList: [".van"], // 忽略转换正则匹配项
          //   propList: ["*"],
          //   exclude: /(\/|\\)(node_modules)(\/|\\)/,
          // })
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',  // 需要转换的单位，默认为"px"
            viewportWidth: 375, //  设计稿的视口宽度 ，根据不同的设计稿进行转换
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表， ！ 为排除的属性 '!box-shadow'
            viewportUnit: 'vw', //  希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [".van", "van", 'van-col'], // 需要忽略的CSS选择器
            minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /node_modules/, // 忽略某些文件夹下的文件或特定文件
            include: undefined,  // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 568 // 横屏时使用的视口宽度

          })
        ]
      },
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
        @import '@style/base.scss';
        @import '@style/mixin.scss';
        $src: '${process.env.VUE_APP_PUBLIC_PATH}';
        `
      },
      less: {
        lessOptions: {
          modifyVars: {
            'blue': '#0dbadd' // 修改默认颜色            
          },
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {

    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: 'wjck.chaopin365.com', // 'www.king.com',
    // port: '8080', // 代理端口
    // https: true,
    hotOnly: true, // 热更新
    open: true, // 是否打开浏览器
    proxy: createProxy()
  },
  configureWebpack: config => {
    config.externals = {'AMap': 'AMap'};
},
};
