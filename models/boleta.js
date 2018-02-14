'use strict';
module.exports = (sequelize, DataTypes) => {
  var Boleta = sequelize.define('Boleta', {
    fecha_solicitud: DataTypes.DATE,
    observacion: DataTypes.STRING,
    estado: DataTypes.STRING(20),
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    dias: DataTypes.DOUBLE,
    codigo: DataTypes.INTEGER(10),
    id_empleado: DataTypes.INTEGER,
    id_tipo_boleta: DataTypes.INTEGER,
    usuario_anulacion_aprobacion: DataTypes.INTEGER,
    fecha_anulacion_aprobacion: DataTypes.DATE,
    motivo: DataTypes.STRING,
    fucov: DataTypes.STRING,
    fecha_desde_hasta: DataTypes.STRING,
    lugar: DataTypes.STRING,
    fecha_marcado: DataTypes.DATE,
    periodo_marcado: DataTypes.STRING
  });
  
  Boleta.associate = function (models) {
    Boleta.belongsTo(models.Empleado, {foreignKey: 'id_empleado', as: 'empleado'});
    Boleta.belongsTo(models.Tipo_boleta, {foreignKey: 'id_tipo_boleta', as: 'tipoboleta'});
  };

  return Boleta;
};
