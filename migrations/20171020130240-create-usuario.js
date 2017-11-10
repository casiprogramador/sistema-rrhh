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
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },
<<<<<<< HEAD
      ultingreso: {
        type: Sequelize.DATE
      },
      resetpwd: {
        type: Sequelize.DATE
      },
      id_empleado: {
=======
      rol_id: {
>>>>>>> ebd738af926e1348ffa47031581427d484cc89da
        type: Sequelize.INTEGER,
        references: {
            model: 'Empleados',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      id_rol: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rols',
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