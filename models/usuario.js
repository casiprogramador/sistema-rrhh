'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    username: DataTypes.STRING(50),
    estado: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    ultingreso: DataTypes.DATE,
    resetpwd: DataTypes.BOOLEAN,
    id_rol: DataTypes.INTEGER
  });
  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Rol,{foreignKey: 'id_rol', as: 'rol'});
    Usuario.hasOne(models.Empleado, {foreignKey: 'id_usuario', as: 'empleado'});
  };
  return Usuario;
};
