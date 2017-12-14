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
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      min_entrada_1: {
        type: Sequelize.TIME,
        allowNull: true
      },
      max_entrada_1: {
        type: Sequelize.TIME,
        allowNull: true
      },
      entrada_1: {
        type: Sequelize.TIME,
        allowNull: true
      },
      tolerancia_entrada_1: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      min_salida_1: {
        type: Sequelize.TIME,
        allowNull: true
      },
      max_salida_1: {
        type: Sequelize.TIME,
        allowNull: true
      },
      salida_1: {
        type: Sequelize.TIME,
        allowNull: true
      },
      tolerancia_salida_1: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      min_entrada_2: {
        type: Sequelize.TIME,
        allowNull: true
      },
      max_entrada_2: {
        type: Sequelize.TIME,
        allowNull: true
      },
      entrada_2:{
        type: Sequelize.TIME,
        allowNull: true
      },
      tolerancia_entrada_2: {
        type: Sequelize.INTEGER,
        allowNull: true
      }, 
      min_salida_2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      max_salida_2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      salida_2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tolerancia_salida_2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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