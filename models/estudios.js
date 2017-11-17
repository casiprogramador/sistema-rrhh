'use strict';
module.exports = (sequelize, DataTypes) => {
  var Estudios = sequelize.define('Estudios', {
    carrera: DataTypes.STRING,
    institucion: DataTypes.STRING,
    pais: DataTypes.STRING(50),
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    anios_vencidos: DataTypes.INTEGER,
    titulo: DataTypes.STRING(50),
    nivel: DataTypes.STRING(20),
    especificacion: DataTypes.STRING,
    concluida: DataTypes.BOOLEAN,
    ciudad: DataTypes.STRING(50),
    colegio_prof: DataTypes.STRING(50),
    nro_registro_prof: DataTypes.STRING(50),
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
