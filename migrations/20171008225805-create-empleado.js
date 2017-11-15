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
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
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
      esposo: {
        type: Sequelize.STRING(50)
      },
      fecha_nacimiento: {
        type: Sequelize.DATE
      },
      pais: {
        type: Sequelize.STRING(50)
      },
      departamento: {
        type: Sequelize.STRING(50)
      },
      provincia: {
        type: Sequelize.STRING(50)
      },
      fecha_ingreso: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING(1)
      },
      estado_civil: {
        type: Sequelize.STRING(1)
      },
      num_serv_mil: {
        type: Sequelize.STRING(50)
      },    
      grupo_sang: {
        type: Sequelize.STRING(20)
      },
      direccion: {
        type: Sequelize.STRING(50)
      },
      telefono: {
        type: Sequelize.STRING(20)
      },
      celular: {
        type: Sequelize.STRING(20)
      },
      casilla: {
        type: Sequelize.STRING(20)
      },
      email_personal: {
        type: Sequelize.STRING(50)
      },
      email_trabajo: {
        type: Sequelize.STRING(50)
      },
      nit: {
        type: Sequelize.STRING(20)
      },
      afp: {
        type: Sequelize.STRING(50)
      },
      seguro_medico: {
        type: Sequelize.STRING(50)
      },
      nro_seguro: {
        type: Sequelize.STRING(50)
      },
      nua: {
        type: Sequelize.STRING(50)
      },
      ren: {
        type: Sequelize.STRING(50)
      },
      nro_declar_jurada: {
        type: Sequelize.STRING(50)
      },
      col_profesional: {
        type: Sequelize.STRING(50)
      },
      nro_registro_pro: {
        type: Sequelize.STRING(50)
      },
      foto: {
        type: Sequelize.STRING
      },
      banco: {
        type: Sequelize.STRING(50)
      },
      nro_cuenta: {
        type: Sequelize.STRING(50)
      },
      tipo_cuenta: {
        type: Sequelize.STRING(50)
      },
      ausr: {
        type: Sequelize.STRING(50)
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      discapacidad: {
        type: Sequelize.BOOLEAN
      },
      nro_carnet_discapacidad: {
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
