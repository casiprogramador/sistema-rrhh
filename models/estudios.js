'use strict';
module.exports = (sequelize, DataTypes) => {
  var Estudios = sequelize.define('Estudios', {
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    titulo: DataTypes.STRING(50),
    nivel: DataTypes.STRING(20),
    concluida: DataTypes.BOOLEAN,
    ciudad: DataTypes.STRING(50),
    colegio_prof: DataTypes.STRING(50),
    id_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Estudios;
};
