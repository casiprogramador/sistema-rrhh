'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    username: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    ultingreso: DataTypes.DATE,
    resetpwd: DataTypes.BOOLEAN,
  });
  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Rol,{foreignKey: 'rol_id', as: 'rol'});
  };
  return Usuario;
};