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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582516194112_7723';

  // add your middleware config here
  config.middleware = [];

  config.cluster = {
    listen: {
      port: 8282,
      hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    },
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

  config.alinode = {
    appid: '84125',
    secret: '649df8d9b01aaec5ed3de2fe086ecb27dd56a77f',
  };

  return {
    ...config,
  };
};
