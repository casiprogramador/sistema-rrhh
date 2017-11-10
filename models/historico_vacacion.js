'use strict';
module.exports = (sequelize, DataTypes) => {
  var Historico_Vacacion = sequelize.define('Historico_Vacacion', {
    gestion: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Historico_Vacacion;
};