'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tipo_Empleados', [{
      tipo: 'PLANTA',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      tipo: 'EVENTUAL',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      tipo: 'CONSULTOR',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      tipo: 'PASANTE',
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
