'use strict';
module.exports = (sequelize, DataTypes) => {
  var BS = sequelize.define('BS', {
    UserID: DataTypes.INTEGER,
    eventTime: DataTypes.DATE,
    tnaEvent: DataTypes.INTEGER,
    bandera: DataTypes.INTEGER,
    Code: DataTypes.STRING(20),
    IP: DataTypes.STRING(15),
    bandera: DataTypes.STRING(15)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BS;
};
 