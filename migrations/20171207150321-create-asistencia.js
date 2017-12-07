'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Asistencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      entrada_1: {
        type: Sequelize.TIME
      },
      salida_1: {
        type: Sequelize.TIME
      },
      entrada_2: {
        type: Sequelize.TIME
      },
      salida_2: {
        type: Sequelize.TIME
      },
      retraso_entrada_1: {
        type: Sequelize.INTEGER
      },
      retraso_salida_1: {
        type: Sequelize.INTEGER
      },
      retraso_entrada_2: {
        type: Sequelize.INTEGER
      },
      retraso_salida_2: {
        type: Sequelize.INTEGER
      },
      observacion_1: {
        type: Sequelize.STRING
      },
      observacion_2: {
        type: Sequelize.STRING
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
      id_horario: {
        type: Sequelize.INTEGER,
        
        references: {
            model: 'Horarios',
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
    return queryInterface.dropTable('Asistencia');
  }
};