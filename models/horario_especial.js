'use strict';
module.exports = (sequelize, DataTypes) => {
  var Horario_especial = sequelize.define('Horario_especial', {
    fecha: DataTypes.DATE,
    id_empleado: DataTypes.INTEGER,
    id_horario: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Horario_especial;
};