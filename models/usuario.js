'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    username: DataTypes.STRING(50),
    estado: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    ultingreso: DataTypes.DATE,
    resetpwd: DataTypes.BOOLEAN,
    rol_id: DataTypes.INTEGER,
    empleado_id: DataTypes.INTEGER
  });
  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Rol,{foreignKey: 'rol_id', as: 'rol'});
  };
  return Usuario;
};
