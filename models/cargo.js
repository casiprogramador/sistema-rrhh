'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cargo = sequelize.define('Cargo', {
    cargo: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cargo;
};