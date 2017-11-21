'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    username: DataTypes.STRING(50),
    estado: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    ultingreso: DataTypes.DATE,
    resetpwd: DataTypes.BOOLEAN,
    rol_id: DataTypes.INTEGER
  });
  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Rol,{foreignKey: 'rol_id', as: 'rol'});
    Usuario.hasOne(models.Empleado, {foreignKey: 'usuario_id', as: 'empleado'});
  };
  return Usuario;
};
