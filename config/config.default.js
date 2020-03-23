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

  // // 引入Op模块
  // const Op = require('sequelize').Op;
  // config.sequelize = {
  //   dialect: 'mysql',
  //   host: '127.0.0.1',
  //   port: 3306,
  //   database: 'bluenote_dev',
  //   username: 'root',
  //   password: '123456',
  //   // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
  //   underscored: true,
  //   // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
  //   timezone: '+08:00',
  //   // 使用默认运算符别名
  //   operatorsAliases: {
  //     $eq: Op.eq,
  //     $ne: Op.ne,
  //     $gte: Op.gte,
  //     $gt: Op.gt,
  //     $lte: Op.lte,
  //     $lt: Op.lt,
  //     $not: Op.not,
  //     $in: Op.in,
  //     $notIn: Op.notIn,
  //     $is: Op.is,
  //     $like: Op.like,
  //     $notLike: Op.notLike,
  //     $iLike: Op.iLike,
  //     $notILike: Op.notILike,
  //     $regexp: Op.regexp,
  //     $notRegexp: Op.notRegexp,
  //     $iRegexp: Op.iRegexp,
  //     $notIRegexp: Op.notIRegexp,
  //     $between: Op.between,
  //     $notBetween: Op.notBetween,
  //     $overlap: Op.overlap,
  //     $contains: Op.contains,
  //     $contained: Op.contained,
  //     $adjacent: Op.adjacent,
  //     $strictLeft: Op.strictLeft,
  //     $strictRight: Op.strictRight,
  //     $noExtendRight: Op.noExtendRight,
  //     $noExtendLeft: Op.noExtendLeft,
  //     $and: Op.and,
  //     $or: Op.or,
  //     $any: Op.any,
  //     $all: Op.all,
  //     $values: Op.values,
  //     $col: Op.col,
  //     $fn: Op.fn,
  //   },
  // };

  return {
    ...config,
    ...userConfig,
  };
};
