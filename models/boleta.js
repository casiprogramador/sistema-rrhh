'use strict';
module.exports = (sequelize, DataTypes) => {
  var Boleta = sequelize.define('Boleta', {
    boleta: DataTypes.STRING(50),
    fecha_solicitud: DataTypes.DATE,
    observacion: DataTypes.STRING,
    aprobado: DataTypes.BOOLEAN,
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
