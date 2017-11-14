'use strict';
module.exports = (sequelize, DataTypes) => {
  var Historico_Cas = sequelize.define('Historico_Cas', {
    aa: DataTypes.INTEGER,
    mm: DataTypes.INTEGER,
    dd: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    id_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Historico_Cas;
};
