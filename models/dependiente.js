'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dependiente = sequelize.define('Dependiente', {
    ndi: DataTypes.STRING(30),
    expedido: DataTypes.STRING(5),
    paterno: DataTypes.STRING(50),
    materno: DataTypes.STRING(50),
    nombres: DataTypes.STRING(50),
    fecha_nacimiento: DataTypes.DATE,
    sexo: DataTypes.STRING(1),
    tipo_documento: DataTypes.STRING(50),
    desc_otro: DataTypes.STRING,
    num_doc_depen: DataTypes.STRING(50),
    id_empleado: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Dependiente;
};
