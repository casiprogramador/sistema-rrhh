'use strict';
module.exports = (sequelize, DataTypes) => {
  var Escala_Salarial = sequelize.define('Escala_Salarial', {
    categoria: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Escala_Salarial;
};