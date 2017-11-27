'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tipo_boleta = sequelize.define('Tipo_boleta', {
    tipo_boleta: DataTypes.STRING
  });

  Tipo_boleta.associate = function (models) {
    Tipo_boleta.hasMany(models.Boleta, {foreignKey: 'id_tipo_boleta', as: 'boletas'});
  };

  return Tipo_boleta;
};
