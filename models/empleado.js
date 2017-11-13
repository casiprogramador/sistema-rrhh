'use strict';
module.exports = (sequelize, DataTypes) => {
  var Empleado = sequelize.define('Empleado', {
    ndi: DataTypes.STRING,
    expedido: DataTypes.STRING,
    paterno: DataTypes.STRING,
    materno: DataTypes.STRING,
    nombres: DataTypes.STRING,
    esposo: DataTypes.STRING,
    fecha_nacimiento: DataTypes.DATE,
    pais: DataTypes.STRING,
    departamento: DataTypes.STRING,
    provincia: DataTypes.STRING,
    fecha_ingreso: DataTypes.DATE,
    sexo: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    num_serv_mil: DataTypes.STRING,
    grupo_sang: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    casilla: DataTypes.STRING,
    email_personal: DataTypes.STRING,
    email_trabajo: DataTypes.STRING,
    nit: DataTypes.STRING,
    afp: DataTypes.STRING,
    seguro_medico: DataTypes.STRING,
    nro_seguro: DataTypes.STRING,
    nua: DataTypes.STRING,
    ren: DataTypes.STRING,
    nro_declar_jurada: DataTypes.STRING,
    col_profesional: DataTypes.STRING,
    nro_registro_pro: DataTypes.STRING,
    foto: DataTypes.STRING,
    banco: DataTypes.STRING,
    nro_cuenta: DataTypes.STRING,
    tipo_cuenta: DataTypes.STRING,
    ausr: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Empleado;
};