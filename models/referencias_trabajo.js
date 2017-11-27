'use strict';
module.exports = (sequelize, DataTypes) => {
  var Referencias_Trabajo = sequelize.define('Referencias_Trabajo', {
    nombre: DataTypes.STRING,
    institucion: DataTypes.STRING,    
    telefono: DataTypes.STRING(20),
    id_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Referencias_Trabajo;
};
