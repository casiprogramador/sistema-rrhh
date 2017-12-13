'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cargo = sequelize.define('Cargo', {
    cargo: DataTypes.STRING,
    id_area: DataTypes.INTEGER,
    id_escala_salarial: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cargo;
};
