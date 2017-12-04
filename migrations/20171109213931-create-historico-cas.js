'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Historico_Cas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aa: {
        type: Sequelize.INTEGER
      },
      mm: {
        type: Sequelize.INTEGER
      },
      dd: {
        type: Sequelize.INTEGER
      },
      codigo_verificacion: {
        type: Sequelize.STRING
      },
      cas: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true 
      },
      id_empleado: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Empleados',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    return queryInterface.dropTable('Historico_Cas');
  }
};