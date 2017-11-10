'use strict';
module.exports = (sequelize, DataTypes) => {
  var Estudios = sequelize.define('Estudios', {
    Fecha_inicio: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Estudios;
};