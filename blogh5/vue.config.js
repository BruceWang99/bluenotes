const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

const BASE_URL = '/';

module.exports = {
  publicPath: BASE_URL,
  assetsDir: 'static',

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'));
  },
  lintOnSave: false,
  devServer: {
    port: 8686,
    compress: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8282',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api', // rewrite path
        },
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      externals: ['serialport'],
      nodeModulesPath: ['../../node_modules', './node_modules'],
      builderOptions: {
        appId: 'bluenote_v1.0',
        productName: 'bluenote',
        copyright: 'Copyright © 2020', //版权信息
        mac: {
          icon: './public/icon.png',
          target: [
            {
              target: 'dmg',
            },
            {
              target: 'zip',
            },
            // {
            //   'target': 'pkg'
            // },
            // {
            //   'target': 'mas'
            // }
          ],
        },
        win: {
          icon: './public/icon.png', //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: 'nsis', //利用nsis制作安装程序
              arch: [
                'x64', //64位
                'ia32', //32位
              ],
            },
          ],
        },
        nsis: {
          // "oneClick": false, // 是否一键安装
          // // "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          // "allowToChangeInstallationDirectory": true, // 允许修改安装目录
          // "installerIcon": "./public/icon.png",// 安装图标
          // // "uninstallerIcon": "./dist_electron/icon/app.ico",//卸载图标
          // "installerHeaderIcon": "./public/icon.png", // 安装时头部图标
          // "createDesktopShortcut": true, // 创建桌面图标
          // "createStartMenuShortcut": true,// 创建开始菜单图标
          // "shortcutName": "monitorsystem", // 图标名称
        },
      },
    },
  },
};
