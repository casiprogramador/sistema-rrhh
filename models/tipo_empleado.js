'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tipo_Empleado = sequelize.define('Tipo_Empleado', {
        tipo: DataTypes.STRING(50)
    });
    Tipo_Empleado.associate = function(models) {


    };
    return Tipo_Empleado;
};