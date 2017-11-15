'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tipo_boleta', [{
      tipo_boleta : 'Boleta de vacacion completa',
      createdAt : new Date(),
      updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Salida a/c de Vacacion',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta Salida Permiso sin Goce d ...',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Salida en Comision',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Comision por Viaje',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Baja Medica',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Salida por Cumpleaños',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Salida por Matrimonio',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Salida por Nacimiento  ...',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Salida por Fallecimien ...',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta Sal. Permiso Particular',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Justificativos Medicos',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta de Olvido de Marcado',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta Papanicolau, Mamografias, ...',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Boleta Comision con Memorandum',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'Bol. Sal. Esp. Amparado DS 1455',
     createdAt : new Date(),
     updatedAt : new Date()
   },{
     tipo_boleta : 'RM 748/15 Día Nacional de Person ...',
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
