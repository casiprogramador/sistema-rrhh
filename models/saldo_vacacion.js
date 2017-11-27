'use strict';
module.exports = (sequelize, DataTypes) => {
  var Saldo_Vacacion = sequelize.define('Saldo_Vacacion', {
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    dias: DataTypes.INTEGER,
    prescrito_estado: DataTypes.BOOLEAN,
    gestion: DataTypes.INTEGER,
    observacion: DataTypes.STRING,
    id_empleado: DataTypes.INTEGER
  });
  Saldo_Vacacion.associate = function (models) {
    Saldo_Vacacion.belongsTo(models.Empleado,{foreignKey: 'id_empleado', as: 'empleado'});
  };
  return Saldo_Vacacion;
};
