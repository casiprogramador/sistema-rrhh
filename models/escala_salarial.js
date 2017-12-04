'use strict';
module.exports = (sequelize, DataTypes) => {
  var Escala_Salarial = sequelize.define('Escala_Salarial', {
    categoria: DataTypes.STRING(50),
    clase: DataTypes.INTEGER,
    nivel_maestra: DataTypes.INTEGER,
    nivel_correlativo: DataTypes.INTEGER,
    denominacion_puesto: DataTypes.STRING,
    nro_item: DataTypes.INTEGER,
    sueldo_mensual: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Escala_Salarial;
};
