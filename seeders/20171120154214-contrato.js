'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Contratos', [{
      fecha_inicio: '2016-06-20 12:06:31.246-04',
      fecha_fin : null,
      nro_contrato : '167943',
      estado: true,
      id_empleado : 1,
      id_tipo_empleado: 1,
      id_cargo: 1,
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
