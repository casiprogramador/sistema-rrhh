'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Horarios', [{
        id: 1,
        descripcion: 'Discontinuo', 
        min_entrada_1: '06:00:00',
        max_entrada_1: '11:29:00',
        entrada_1: '08:30:00',
        tolerancia_entrada_1: '5',
        min_salida_1: '11:31:00',
        max_salida_1: '13:29:00',
        salida_1: '12:30:00',
        tolerancia_salida_1: '5',
        min_entrada_2: '13:31:00',
        max_entrada_2: '15:00:00',
        entrada_2: '14:30:00',
        tolerancia_entrada_2: '5',
        min_salida_2: '16:00',
        max_salida_2: '00:00',
        salida_2: '18:30',
        tolerancia_salida_2: '5',
        estado: true, 
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        id: 2,
        descripcion: 'Continuo', 
        min_entrada_1: '06:00:00',
        max_entrada_1: '11:29:00',
        entrada_1: '08:30:00',
        tolerancia_entrada_1: '5',
        min_salida_1: '14:31:00',
        max_salida_1: '01:00:00',
        salida_1: '16:30:00',
        tolerancia_salida_1: '0',
        min_entrada_2: '00:00:00',
        max_entrada_2: '00:00:00',
        entrada_2: '00:00:00',
        tolerancia_entrada_2: '0',
        min_salida_2: '00:00',
        max_salida_2: '00:00',
        salida_2: '00:00',
        tolerancia_salida_2: '0',
        estado: true, 
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
},

  down: (queryInterface, Sequelize) => {

  }
};
