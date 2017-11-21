'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tipo_empleado_boleta = sequelize.define('Tipo_empleado_boleta', {
    id_tipo_empleado: DataTypes.INTEGER,
    id_tipo_boleta: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tipo_empleado_boleta;
};