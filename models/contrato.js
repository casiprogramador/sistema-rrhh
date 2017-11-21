'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contrato = sequelize.define('Contrato', {
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    nro_contrato: DataTypes.STRING,
    id_empleado: DataTypes.INTEGER,
    id_tipo_empleado: DataTypes.INTEGER,
    id_cargo: DataTypes.INTEGER
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Contrato;
};
