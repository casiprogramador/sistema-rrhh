'use strict';
module.exports = (sequelize, DataTypes) => {
  var Saldo_Vacacion = sequelize.define('Saldo_Vacacion', {
    fecha_inicio: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Saldo_Vacacion;
};