'use strict';
module.exports = (sequelize, DataTypes) => {
  var Asistencia = sequelize.define('Asistencia', {
    fecha: DataTypes.DATE,
    entrada_1: DataTypes.TIME,
    salida_1: DataTypes.TIME,
    entrada_2: DataTypes.TIME,
    salida_2: DataTypes.TIME,
    retraso_entrada_1: DataTypes.INTEGER,
    retraso_salida_1: DataTypes.INTEGER,
    retraso_entrada_2: DataTypes.INTEGER,
    retraso_salida_2: DataTypes.INTEGER,
    observacion_entrada_1: DataTypes.STRING,
    observacion_salida_1: DataTypes.STRING, 
    observacion_entrada_2: DataTypes.STRING,
    observacion_salida_2: DataTypes.STRING, 
    id_empleado: DataTypes.INTEGER,
    id_horario: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Asistencia;
};