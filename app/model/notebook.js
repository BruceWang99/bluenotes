'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Notebook = app.model.define('notebook', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    name: {
      type: STRING(30),
      allowNull: false,
    },
    note_number: {
      type: INTEGER,
      defaultValue: 0,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  // 定义关联关系
  Notebook.associate = () => {
    // // 定义一对一关联
    Notebook.belongsTo(app.model.User);
    // // 定义一对多关联
    Notebook.hasMany(app.model.Note);
  };
  Notebook.sync({ alter: true });
  return Notebook;
};
