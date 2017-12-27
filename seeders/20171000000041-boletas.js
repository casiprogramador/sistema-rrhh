'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Boleta', [{
      id: 50000,
      fecha_solicitud : new Date(),
      observacion : '',
      estado : 'Pendiente',
      id_empleado : '1',
      id_tipo_boleta : '1',
      fecha_inicio: '12-10-2015',
      fecha_fin: '13-10-2015',
      createdAt : new Date(),
      updatedAt : new Date()
   
}
], {});
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
