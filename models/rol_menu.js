'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rol_Menu = sequelize.define('Rol_Menu', {
    estado: DataTypes.BOOLEAN,
    id_rol:  DataTypes.INTEGER,
    id_menu:  DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Rol_Menu;
};
