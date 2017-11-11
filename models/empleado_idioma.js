'use strict';
module.exports = (sequelize, DataTypes) => {
  var Empleado_Idioma = sequelize.define('Empleado_Idioma', {
    ndi: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Empleado_Idioma;
};