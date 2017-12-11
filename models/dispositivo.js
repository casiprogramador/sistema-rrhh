'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dispositivo = sequelize.define('Dispositivo', {
    DireccionIP: DataTypes.CHAR(15),
    Puerto: DataTypes.CHAR(4),
    Cod_Estado: DataTypes.CHAR(1),
    Modelo: DataTypes.CHAR(20),
    Identificador: DataTypes.CHAR(20),
    Comentario: DataTypes.STRING(100)
  }, {
    classMethods: {
      associate: function(models) {
       // associations can be defined here
      }
    }
  });
   return Dispositivo;
};
