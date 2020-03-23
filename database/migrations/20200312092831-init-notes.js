'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('notes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: INTEGER,
        allowNull: false,
      },
      notebook_id: {
        type: INTEGER,
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
  },

  down: async queryInterface => {
    await queryInterface.dropTable('notes');
  },
};
