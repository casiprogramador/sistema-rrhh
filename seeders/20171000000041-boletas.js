'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Boleta', [{
      fecha_solicitud : new Date(),
      observacion : '',
      estado : 'Pendiente',
      id_empleado : '1',
      id_tipo_boleta : '1',
      fecha_inicio: '12-10-2015',
      fecha_fin: '13-10-2015',
      createdAt : new Date(),
      updatedAt : new Date()
   
},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Anulado',
  id_empleado : '1',
  id_tipo_boleta : '2',
  fecha_inicio: '12-11-2015',
  fecha_fin: '13-11-2015',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Aprobado',
  id_empleado : '1',
  id_tipo_boleta : '2',
  fecha_inicio: '12-12-2015',
  fecha_fin: '13-12-2015',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Pendiente',
  id_empleado : '1',
  id_tipo_boleta : '3',
  fecha_inicio: '12-10-2016',
  fecha_fin: '13-10-2016',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Pendiente',
  id_empleado : '2',
  id_tipo_boleta : '4',
  fecha_inicio: '12-10-2017',
  fecha_fin: '13-10-2017',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Aprobado',
  id_empleado : '1',
  id_tipo_boleta : '4',
  fecha_inicio: '12-10-2014',
  fecha_fin: '13-10-2014',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Aprobado',
  id_empleado : '1',
  id_tipo_boleta : '1',
  fecha_inicio: '02-10-2015',
  fecha_fin: '03-10-2015',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Pendiente',
  id_empleado : '1',
  id_tipo_boleta : '5',
  fecha_inicio: '12-01-2015',
  fecha_fin: '13-01-2015',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Pendiente',
  id_empleado : '2',
  id_tipo_boleta : '6',
  fecha_inicio: '12-10-2013',
  fecha_fin: '13-10-2013',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Aprobado',
  id_empleado : '2',
  id_tipo_boleta : '1',
  fecha_inicio: '12-09-2015',
  fecha_fin: '13-09-2015',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Aprobado',
  id_empleado : '2',
  id_tipo_boleta : '4',
  fecha_inicio: '14-08-2015',
  fecha_fin: '15-08-2015',
  createdAt : new Date(),
  updatedAt : new Date()

},{
  fecha_solicitud : new Date(),
  observacion : '',
  estado : 'Anulado',
  id_empleado : '2',
  id_tipo_boleta : '7',
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
