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
  };
};
