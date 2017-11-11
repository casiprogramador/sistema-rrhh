'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dependientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ndi: {
        type: Sequelize.STRING
      },
      expedido: {
        type: Sequelize.STRING(5)
      },
      paterno: {
        type: Sequelize.STRING
      },
      materno: {
        type: Sequelize.STRING
      },
      nombres: {
        type: Sequelize.STRING
      },
      fecha_nacimiento: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING(2)
      },
      relacion: {
        type: Sequelize.STRING
      },
      cert_matrim: {
        type: Sequelize.STRING(2)
      },
      libreta_fam: {
        type: Sequelize.STRING(2)
      },
      cert_nac: {
        type: Sequelize.STRING(2)
      },
      otro: {
        type: Sequelize.STRING(2)
      },
      desc_otro: {
        type: Sequelize.STRING
      },
      num_doc_depen: {
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
    return queryInterface.dropTable('Dependientes');
  }
};