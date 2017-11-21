'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Boleta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_solicitud: {
        type: Sequelize.DATE
      },
      observacion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING(20)
      },

      fecha_inicio: {
        type: Sequelize.DATE
      },

      fecha_fin: {
        type: Sequelize.DATE
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
      id_tipo_boleta: {
        type: Sequelize.INTEGER,
        
        references: {
            model: 'Tipo_boleta',
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
    return queryInterface.dropTable('Boleta');
  }
};
