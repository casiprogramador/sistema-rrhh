'use strict';
module.exports = (sequelize, DataTypes) => {
  var Horario = sequelize.define('Horario', {
    ingreso: DataTypes.STRING,
    ingreso_maximo: DataTypes.STRING,
    ingreso_minimo: DataTypes.STRING,
    ingreso_tolerancia: DataTypes.STRING,
    salida: DataTypes.STRING,
    salida_maxima: DataTypes.STRING,
    salida_minima: DataTypes.STRING,
    salida_tolerancia: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Horario;
};