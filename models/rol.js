'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rol = sequelize.define('Rol', {
    rol: DataTypes.STRING
  });
  return Rol;
};