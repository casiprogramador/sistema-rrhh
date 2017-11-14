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
        type: Sequelize.STRING(30)
      },
      expedido: {
        type: Sequelize.STRING(5)
      },
      paterno: {
        type: Sequelize.STRING(50)
      },
      materno: {
        type: Sequelize.STRING(50)
      },
      nombres: {
        type: Sequelize.STRING(50)
      },
      fecha_nacimiento: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING(1)
      },
      relacion: {
        type: Sequelize.STRING(20)
      },
      cert_matrim: {
        type: Sequelize.BOOLEAN
      },
      libreta_fam: {
        type: Sequelize.BOOLEAN
      },
      cert_nac: {
        type: Sequelize.BOOLEAN
      },
      otro: {
        type: Sequelize.BOOLEAN
      },
      desc_otro: {
        type: Sequelize.STRING
      },
      num_doc_depen: {
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
    return queryInterface.dropTable('Dependientes');
  }
};
