'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(50)
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },
      ultingreso: {
        type: Sequelize.DATE
      },
      resetpwd: {
        type: Sequelize.BOOLEAN
      },
      rol_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rols',
          key: 'id'
      },
      empleado_id: {
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
    return queryInterface.dropTable('Usuarios');
  }
};
