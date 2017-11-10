'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ingreso: {
        type: Sequelize.STRING
      },
      ingreso_maximo: {
        type: Sequelize.STRING
      },
      ingreso_minimo: {
        type: Sequelize.STRING
      },
      ingreso_tolerancia: {
        type: Sequelize.STRING
      },
      salida: {
        type: Sequelize.STRING
      },
      salida_maxima: {
        type: Sequelize.STRING
      },
      salida_minima: {
        type: Sequelize.STRING
      },
      salida_tolerancia: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Horarios');
  }
};