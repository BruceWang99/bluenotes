'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Note = app.model.define('note', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    notebook_id: {
      type: INTEGER,
      // allowNull: false,
    },
    title: {
      type: STRING(100),
      allowNull: false,
    },
    content: {
      type: STRING(5000),
      allowNull: false,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  // 定义关联关系
  Note.associate = () => {
    // // 定义一对一关联
    Note.belongsTo(app.model.User);
    Note.belongsTo(app.model.Notebook);

  };
  Note.sync({ alter: true });
  return Note;
};
