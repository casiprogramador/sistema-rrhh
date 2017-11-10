'use strict';
module.exports = (sequelize, DataTypes) => {
  var Historico_Cas = sequelize.define('Historico_Cas', {
    aa: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Historico_Cas;
};