'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Estudios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },      
      titulo: {
        type: Sequelize.STRING(50)
      },
      nivel: {
        type: Sequelize.STRING(20)
      },
      concluida: {
        type: Sequelize.BOOLEAN
      },
      ciudad: {
        type: Sequelize.STRING(50)
      },
      colegio_prof: {
        type: Sequelize.STRING(50)

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
    return queryInterface.dropTable('Estudios');
  }
};
