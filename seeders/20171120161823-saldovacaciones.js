'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Saldo_Vacacions', [{
      fecha_inicio : '2015-06-20 12:06:31.246-04',
      fecha_fin: '2016-06-21 12:06:31.246-04',
      dias: 5,
      prescrito_estado: false,
      gestion: 2016,
      observacion: '',
      id_empleado: 1,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      fecha_inicio : '2016-06-20 12:06:31.246-04',
      fecha_fin: '2017-06-21 12:06:31.246-04',
      dias: 7,
      prescrito_estado: false,
      gestion: 2017,
      observacion: '',
      id_empleado: 1,
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
