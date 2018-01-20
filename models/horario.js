'use strict';
module.exports = (sequelize, DataTypes) => {
  var Horario = sequelize.define('Horario', {
    descripcion: DataTypes.STRING,
    min_entrada_1: DataTypes.TIME,
    max_entrada_1: DataTypes.TIME,
    entrada_1: DataTypes.TIME,
    tolerancia_entrada_1: DataTypes.INTEGER,
    min_salida_1: DataTypes.TIME,
    max_salida_1: DataTypes.TIME,
    salida_1: DataTypes.TIME,
    tolerancia_salida_1: DataTypes.INTEGER,
    min_entrada_2: DataTypes.TIME,
    max_entrada_2: DataTypes.TIME,
    entrada_2: DataTypes.TIME,
    tolerancia_entrada_2: DataTypes.INTEGER,
    min_salida_2: DataTypes.TIME,
    max_salida_2: DataTypes.TIME,
    salida_2: DataTypes.TIME,
    tolerancia_salida_2: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  });
  Horario.associate = function(models) {
    Horario.hasMany(models.Empleado, { foreignKey: 'id_horario', as: 'empleados' });
    Horario.hasMany(models.Horario_especial, { foreignKey: 'id_horario', as: 'horariosespeciales' });
  };
  return Horario;

};