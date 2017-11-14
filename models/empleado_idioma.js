'use strict';
module.exports = (sequelize, DataTypes) => {
  var Empleado_Idioma = sequelize.define('Empleado_Idioma', {
    id_empleado: DataTypes.INTEGER,
    id_idioma: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Empleado_Idioma;
};
