'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rols', [{
      id: 1,
      nombre : 'SUPERADMIN',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Rols', [{
      nombre :'SUPERADMIN'
    }])
  }
};
