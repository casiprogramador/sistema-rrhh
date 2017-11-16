'use strict';
module.exports = (sequelize, DataTypes) => {
  var Empleado_Idioma = sequelize.define('Empleado_Idioma', {
    lee: DataTypes.INTEGER,
    escribe: DataTypes.INTEGER,
    habla: DataTypes.INTEGER,
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
