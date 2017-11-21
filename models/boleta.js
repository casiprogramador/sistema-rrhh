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
    id_tipo_boleta: DataTypes.INTEGER
  });
  
    Boleta.associate = function (models) {
    Boleta.belongsTo(models.Empleado, {foreignKey: 'id_empleado', as: 'empleado'});
  };

  return Boleta;
};
