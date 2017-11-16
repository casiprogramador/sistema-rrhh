'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Empleados', [{
      ndi:'4838771',
      expedido:'LP',
      paterno: 'DIAZ',
      materno: 'LANZA',
      nombres: 'HELMUT DOMENICO',
      fecha_nacimiento: '19-10-1966', 
      fecha_ingreso: '01-01-2015', 
      sexo: 'H', 
      estado: true, 
      discapacidad: false,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      ndi:'4456411',
      expedido:'LP',
      paterno: 'AQUINO',
      materno: 'CASTRO',
      nombres: 'REYNALDO',
      fecha_nacimiento: '21-10-1990', 
      fecha_ingreso: '01-01-2017', 
      sexo: 'H', 
      estado: true, 
      discapacidad: false,
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
