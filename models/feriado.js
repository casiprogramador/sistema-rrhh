'use strict';
module.exports = (sequelize, DataTypes) => {
  const feriado = sequelize.define('feriado', {
    fecha_feriado: DataTypes.STRING(50),
    desc_feriado: DataTypes.STRING
  });
   return feriado;
};
