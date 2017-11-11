'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tipo_Empleado = sequelize.define('Tipo_Empleado', {
    tipo: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tipo_Empleado;
};