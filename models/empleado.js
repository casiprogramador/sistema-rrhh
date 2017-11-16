'use strict';
module.exports = (sequelize, DataTypes) => {
  var Empleado = sequelize.define('Empleado', {
    ndi: DataTypes.STRING(30),
    expedido: DataTypes.STRING(5),
    paterno: DataTypes.STRING(50),
    materno: DataTypes.STRING(50),
    nombres: DataTypes.STRING(50),
    esposo: DataTypes.STRING(50),
    fecha_nacimiento: DataTypes.DATE,
    pais_expedido: DataTypes.STRING(50),
    pais_nacimiento: DataTypes.STRING(50),
    nacionalidad: DataTypes.STRING(50),
    departamento: DataTypes.STRING(50),
    provincia: DataTypes.STRING(50),
    fecha_ingreso: DataTypes.DATE,
    sexo: DataTypes.STRING(1),
    estado_civil: DataTypes.STRING(1),
    num_serv_mil: DataTypes.STRING(50),
    grupo_sang: DataTypes.STRING(20),
    calle_avenida: DataTypes.STRING,
    nro_direccion: DataTypes.INTEGER,
    edificio_direccion: DataTypes.STRING,
    piso_edificio: DataTypes.INTEGER,
    departamento: DataTypes.STRING(20),
    zona: DataTypes.STRING,
    telefono: DataTypes.STRING(20),
    celular: DataTypes.STRING(20),
    casilla: DataTypes.STRING(20),
    email_personal: DataTypes.STRING(50),
    email_trabajo: DataTypes.STRING(50),
    nit: DataTypes.STRING(20),
    afp: DataTypes.STRING(50),
    seguro_medico: DataTypes.STRING(50),
    nro_seguro: DataTypes.STRING(50),
    tipo_seguro: DataTypes.STRING(50),
    nua: DataTypes.STRING(50),
    ren: DataTypes.STRING(50),
    años_calificados: DataTypes.INTEGER,
    nro_declar_jurada: DataTypes.STRING(50),
    col_profesional: DataTypes.STRING(50),
    nro_registro_pro: DataTypes.STRING(50),
    foto: DataTypes.STRING,
    banco: DataTypes.STRING(50),
    nro_cuenta: DataTypes.STRING(50),
    tipo_cuenta: DataTypes.STRING(50),
    ausr: DataTypes.STRING(50),
    estado: DataTypes.BOOLEAN,
    discapacidad: DataTypes.BOOLEAN,
    discapacidad: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Empleado;
};
