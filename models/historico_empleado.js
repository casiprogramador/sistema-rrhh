'use strict';
module.exports = (sequelize, DataTypes) => {
  var Historico_Empleado = sequelize.define('Historico_Empleado', {
    id_tipo_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Historico_Empleado;
};