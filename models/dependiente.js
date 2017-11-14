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
    relacion: DataTypes.STRING(20),
    cert_matrim: DataTypes.BOOLEAN,
    libreta_fam: DataTypes.BOOLEAN,
    cert_nac: DataTypes.BOOLEAN,
    otro: DataTypes.BOOLEAN,
    desc_otro: DataTypes.STRING(50),
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
