'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feriado = sequelize.define('Feriado', {
    fecha_feriado: DataTypes.DATE,
    desc_feriado: DataTypes.STRING
  });
   return Feriado;
};
