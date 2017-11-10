'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rol = sequelize.define('Rol', {
    nombre: DataTypes.STRING
  });
  return Rol;
};