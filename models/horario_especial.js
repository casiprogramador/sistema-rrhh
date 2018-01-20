'use strict';
module.exports = (sequelize, DataTypes) => {
  var Horario_especial = sequelize.define('Horario_especial', {
    fecha: DataTypes.DATE,
    id_empleado: DataTypes.INTEGER,
    id_horario: DataTypes.INTEGER
  });
  Horario_especial.associate = function(models) {
    Horario_especial.belongsTo(models.Horario, { foreignKey: 'id_horario', as: 'horario' });
  };
  return Horario_especial;
};