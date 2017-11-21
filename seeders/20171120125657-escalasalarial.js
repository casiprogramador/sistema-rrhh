'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Escala_Salarials', [{
      categoria : 'OPERATIVO',
      clase: 8,
      nivel_maestra: 25,
      nivel_correlativo: 17,
      denominacion_puesto: 'Auxiliar 1',
      nro_item: 1,
      sueldo_mensual: 3654,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoria : 'OPERATIVO',
      clase: 8,
      nivel_maestra: 18,
      nivel_correlativo: 11,
      denominacion_puesto: 'Tecnico IV',
      nro_item: 4,
      sueldo_mensual: 7919,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
