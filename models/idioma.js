'use strict';
module.exports = (sequelize, DataTypes) => {
  var Idioma = sequelize.define('Idioma', {
    idioma: DataTypes.STRING(50),
    id_empleado:  DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Idioma;
};
