'use strict';
module.exports = (sequelize, DataTypes) => {
  var Boleta = sequelize.define('Boleta', {
    boleta: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Boleta;
};