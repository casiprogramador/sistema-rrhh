'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Escala_Salarials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoria: {
        type: Sequelize.STRING
      },
      clase: {
        type: Sequelize.INTEGER
      },
      nivel_maestra: {
        type: Sequelize.INTEGER
      },
      nivel_correlativo: {
        type: Sequelize.INTEGER
      },
      denominacion_puesto: {
        type: Sequelize.STRING
      },
      nro_item: {
        type: Sequelize.INTEGER
      },
      sueldo_mensual: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('Escala_Salarials');
  }
};