'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feriado = sequelize.define('Feriado', {
    fecha_feriado: DataTypes.STRING(50),
    desc_feriado: DataTypes.STRING
  });
   return Feriado;
};
