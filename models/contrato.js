'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contrato = sequelize.define('Contrato', {
    descripcion: DataTypes.TEXT,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    nro_contrato: DataTypes.STRING,
    id_empleado: DataTypes.INTEGER,
    id_tipo_empleado: DataTypes.INTEGER,
    id_cargo: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  });
  Contrato.associate = function (models) {
    Contrato.belongsTo(models.Empleado,{foreignKey: 'id_empleado', as: 'empleado'});
    Contrato.belongsTo(models.Cargo,{foreignKey: 'id_cargo', as: 'cargo'});
  };
  return Contrato;
};
