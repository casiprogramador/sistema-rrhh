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
      boleta: {
        type: Sequelize.STRING(50)
      },
      fecha_solicitud: {
        type: Sequelize.DATE
      },
      observacion: {
        type: Sequelize.STRING
      },
      aprobado: {
        type: Sequelize.BOOLEAN
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
