'use strict';
module.exports = (sequelize, DataTypes) => {
  var Referencias_Trabajo = sequelize.define('Referencias_Trabajo', {
    fecha_inicio: DataTypes.DATE,
    nombre: DataTypes.STRING,
    relacion: DataTypes.STRING,    
    telefono: DataTypes.STRING(20)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Referencias_Trabajo;
};