'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Empleados', [{
            ndi: '123456789',
            expedido: 'LP',
            paterno: 'EMPLEADO',
            materno: 'PRUEBA',
            nombres: 'EMPLEADO PRUEBA',
            fecha_nacimiento: '19-10-1966',
            fecha_ingreso: '01-01-2015',
            sexo: 'H',
            usuario_id: 2,
            estado: true,
            discapacidad: false,
            createdAt: new Date(),
            updatedAt: new Date()
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