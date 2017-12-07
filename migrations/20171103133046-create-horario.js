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
      descricion: {
        type: Sequelize.STRING
      },
      min_entrada_1: {
        type: Sequelize.TIME
      },
      max_entrada_1: {
        type: Sequelize.TIME
      },
      entrada_1: {
        type: Sequelize.TIME
      },
      tolerancia_entrada_1: {
        type: Sequelize.INTEGER
      },
      min_salida_1: {
        type: Sequelize.TIME
      },
      max_salida_1: {
        type: Sequelize.TIME
      },
      salida_1: {
        type: Sequelize.TIME
      },
      tolerancia_salida_1: {
        type: Sequelize.INTEGER
      },
      min_entrada_2: {
        type: Sequelize.TIME
      },
      max_entrada_2: {
        type: Sequelize.TIME
      },
      entrada_2:{
        type: Sequelize.TIME
      },
      tolerancia_entrada_2: {
        type: Sequelize.INTEGER
      }, 
      min_salida_2: {
        type: Sequelize.STRING
      },
      max_salida_2: {
        type: Sequelize.STRING
      },
      salida_2: {
        type: Sequelize.STRING
      },
      tolerancia_salida_2: {
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