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

  // 引入Op模块
  const Op = require('sequelize').Op;
  config.sequelize = {
    dialect: 'mysql',
    host: '112.124.16.145',
    port: 3306,
    database: 'bluenote_pro',
    username: 'bluenote_pro',
    password: 'Ww:123456',
    // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
    underscored: true,
    // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
    timezone: '+08:00',
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col,
      $fn: Op.fn,
    },
  };

  return {
    ...config,
  };
};
