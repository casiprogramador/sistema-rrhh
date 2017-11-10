'use strict';
module.exports = (sequelize, DataTypes) => {
  var Experiencia = sequelize.define('Experiencia', {
    nombre_empresa: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Experiencia;
};