'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_name: {
      type: STRING(30),
      allowNull: false,
    },
    email: STRING,
    password: {
      type: STRING,
      allowNull: false,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  // 定义关联关系
  User.associate = function() {
    // 定义一对多关联
    User.hasMany(app.model.Note);
    User.hasMany(app.model.Notebook);
  };

  // 标准同步 只有当数据库中不存在与模型同名的数据表时，才会同步
  // User.sync();
  // 动态同步 修改同名数据表结构，以适用模型。
  User.sync({ alter: true });
  // 强制同步 删除同名数据表后同步，谨慎使用，会导致数据丢失
  // User.sync({ force: true });
  return User;
};
