'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cargo = sequelize.define('Cargo', {
    cargo: DataTypes.STRING,
    id_area: DataTypes.INTEGER,
    id_escala_salarial: DataTypes.INTEGER
  });
  Cargo.associate = function (models) {
    Cargo.hasMany(models.Contrato,{foreignKey: 'id_cargo', as: 'contratos'});
  };
  return Cargo;
};
