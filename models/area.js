'use strict';
module.exports = (sequelize, DataTypes) => {
  var Area = sequelize.define('Area', {
    id_area_superior: DataTypes.INTEGER,
    desc_area: DataTypes.STRING(50),
    estado: DataTypes.BOOLEAN,
    ausr: DataTypes.STRING(50)
  });
  return Area;
};
