'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cargos', [{
      cargo : 'Ministro(a)',
      id_area: 1,
      id_escala_salarial: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      cargo : 'Jefe de Gabinete',
      id_area: 1,
      id_escala_salarial: 1,
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
