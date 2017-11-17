'use strict';
module.exports = (sequelize, DataTypes) => {
  var Boleta = sequelize.define('Boleta', {
    fecha_solicitud: DataTypes.DATE,
    observacion: DataTypes.STRING,
    estado: DataTypes.STRING(20),
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    id_empleado: DataTypes.INTEGER,
    id_tipo_boleta: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Boleta;
};
