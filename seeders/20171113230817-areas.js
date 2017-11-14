'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Areas', [{
      id_area_superior : NULL,
      desc_area : 'MDPyEP',
      estado: true,
      ausr: '',
      nivel: 0,
      ultingreso: new Date(),
      resetpwd: false,
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
