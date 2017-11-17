'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rol = sequelize.define('Rol', {
    rol: DataTypes.STRING(50)
  });
  return Rol;
};
