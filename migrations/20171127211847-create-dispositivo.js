'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dispositivos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DireccionIP: {
        type: Sequelize.CHAR(15)
      },
      Puerto: {
        type: Sequelize.CHAR(4)
      },
      Cod_Estado: {
        type: Sequelize.CHAR(20)
      },
      Modelo: {
        type: Sequelize.CHAR(30)
      },
      Identificador: {
        type: Sequelize.CHAR(20)
      },
      Comentario: {
        type: Sequelize.STRING(100)
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
     return queryInterface.dropTable('Dispositivos');
  }
};
