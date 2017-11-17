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
      carrera: {
        type: Sequelize.STRING
      },
      institucion: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING(50)
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },     
      anios_vencidos: {
        type: Sequelize.INTEGER
      },  
      titulo: {
        type: Sequelize.STRING(50)
      },
      nivel: {
        type: Sequelize.STRING(20)
      },
      especificacion: {
        type: Sequelize.STRING
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
      nro_registro_prof: {
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
