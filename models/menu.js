'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    nombre: DataTypes.STRING,
    url: DataTypes.STRING,
    icono: DataTypes.STRING,
    nive_superior: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Menu.belongsTo(models.Rol);
      }
    }
  });
  return Menu;
};