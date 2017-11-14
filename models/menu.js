'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    nombre: DataTypes.STRING(50),
    url: DataTypes.STRING,
    icono: DataTypes.STRING,
    tipo:  DataTypes.STRING(50),
    nivel_superior: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Menu.belongsTo(models.Rol);
      }
    }
  });
  return Menu;
};
