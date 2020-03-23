/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cluster = {
    listen: {
      port: 8282,
      hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582516194112_7723';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];
  config.errorHandler = {
    match: '/api',
  };

  // jwt
  config.jwt = {
    secret: '8brucewang8', // 自定义 token 的加密条件字符串
  };

  // 跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 安全
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:8080' ], // 允许访问接口的白名单
  };

  // add your user config here
  const userConfig = {
    myAppName: 'bluenote',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '112.124.16.145',
    port: 3306,
    database: 'bluenote_pro',
    username: 'bluenote_pro',
    password: 'Ww:123456',
    underscored: true,
    timezone: '+08:00',
  };

  return {
    ...config,
    ...userConfig,
  };
};
