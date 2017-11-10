'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tipo_boleta = sequelize.define('Tipo_boleta', {
    tipo_boleta: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tipo_boleta;
};