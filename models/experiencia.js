'use strict';
module.exports = (sequelize, DataTypes) => {
  var Experiencia = sequelize.define('Experiencia', {
    nombre_empresa: DataTypes.STRING(50),
    tipo_empresa: DataTypes.STRING(50),
    pais: DataTypes.STRING(50),
    ciudad: DataTypes.STRING,
    cargo: DataTypes.STRING(50),
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    id_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Experiencia;
};
