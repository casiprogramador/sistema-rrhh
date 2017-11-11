'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rol_Menu = sequelize.define('Rol_Menu', {
    estado: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Rol_Menu;
};