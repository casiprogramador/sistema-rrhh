'use strict';
module.exports = (sequelize, DataTypes) => {
  var Boleta = sequelize.define('Boleta', {
    fecha_solicitud: DataTypes.DATE,
    observacion: DataTypes.STRING,
    estado: DataTypes.STRING(20),
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    id_tipo_boleta: DataTypes.INTEGER,
    id_empleado: DataTypes.INTEGER
  });
  
    Boleta.associate = function (models) {
    Boleta.belongsTo(models.Empleado, {foreignKey: 'id_empleado', as: 'empleado'});
  };

  return Boleta;
};
