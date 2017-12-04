'use strict';
module.exports = (sequelize, DataTypes) => {
  var Historico_Cas = sequelize.define('Historico_Cas', {
    aa: DataTypes.INTEGER,
    mm: DataTypes.INTEGER,
    dd: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    estado: DataTypes.BOOLEAN,
    codigo_verificacion: DataTypes.STRING,
    cas: DataTypes.STRING,
    id_empleado: DataTypes.INTEGER
  });
  Historico_Cas.associate = function (models) {
    Historico_Cas.belongsTo(models.Empleado,{foreignKey: 'id_empleado', as: 'empleado'});
  };
  return Historico_Cas;
};
