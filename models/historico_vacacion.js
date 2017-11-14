'use strict';
module.exports = (sequelize, DataTypes) => {
  var Historico_Vacacion = sequelize.define('Historico_Vacacion', {
    gestion: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    dias: DataTypes.INTEGER,
    observacion: DataTypes.STRING,
    id_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Historico_Vacacion;
};
