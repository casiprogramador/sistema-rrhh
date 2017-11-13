'use strict';
module.exports = (sequelize, DataTypes) => {
  var Area = sequelize.define('Area', {
    id_area_superior: DataTypes.INTEGER,
    desc_area: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    ausr: DataTypes.STRING
  });
  return Area;
};