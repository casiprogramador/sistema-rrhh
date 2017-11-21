'use strict';
module.exports = (sequelize, DataTypes) => {
  var Referencias_Personales = sequelize.define('Referencias_Personales', {
    nombre: DataTypes.STRING,
    relacion: DataTypes.STRING,    
    telefono: DataTypes.STRING(20),
    id_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Referencias_Personales;
};
