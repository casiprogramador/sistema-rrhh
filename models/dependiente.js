'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dependiente = sequelize.define('Dependiente', {
    NDI: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Dependiente;
};