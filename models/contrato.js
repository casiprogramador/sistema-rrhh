'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contrato = sequelize.define('Contrato', {
    id_tipo_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Contrato;
};