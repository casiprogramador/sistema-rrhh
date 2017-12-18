'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserID: {
        type: Sequelize.INTEGER
      },
      eventTime: {
        type: Sequelize.DATE
      },
      tnaEvent: {
        type: Sequelize.INTEGER
      },
      bandera: {
        type: Sequelize.INTEGER
      },
      Code: {
        type: Sequelize.STRING(20)
      },
      IP: {
        type: Sequelize.STRING(15)
      },
      bandera: {
        type: Sequelize.STRING(15)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bs');
  }
};