'use strict';
module.exports = (sequelize, DataTypes) => {
  var Empleado = sequelize.define('Empleado', {
    DNI: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Empleado;
};