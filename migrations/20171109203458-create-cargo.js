'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cargos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cargo: {
        type: Sequelize.STRING(50)
      },
      id_area: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Areas',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      id_escala_salarial: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Escala_Salarials',
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
    return queryInterface.dropTable('Cargos');
  }
};
