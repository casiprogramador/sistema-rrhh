'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Empleados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ndi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      expedido: {
        type: Sequelize.STRING
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
      esposo: {
        type: Sequelize.STRING
      },
      fecha_nacimiento: {
        type: Sequelize.DATE
      },
      pais: {
        type: Sequelize.STRING
      },
      departamento: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      fecha_ingreso: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING
      },
      estado_civil: {
        type: Sequelize.STRING
      },
      num_serv_mil: {
        type: Sequelize.STRING
      },    
      grupo_sang: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      casilla: {
        type: Sequelize.STRING
      },
      email_personal: {
        type: Sequelize.STRING
      },
      email_trabajo: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      afp: {
        type: Sequelize.STRING
      },
      seguro_medico: {
        type: Sequelize.STRING
      },
      nro_seguro: {
        type: Sequelize.STRING
      },
      nua: {
        type: Sequelize.STRING
      },
      ren: {
        type: Sequelize.STRING
      },
      nro_declar_jurada: {
        type: Sequelize.STRING
      },
      col_profesional: {
        type: Sequelize.STRING
      },
      nro_registro_pro: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      banco: {
        type: Sequelize.STRING
      },
      nro_cuenta: {
        type: Sequelize.STRING
      },
      tipo_cuenta: {
        type: Sequelize.STRING
      },
      ausr: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Empleados');
  }
};