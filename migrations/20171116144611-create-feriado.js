'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feriado', {
      fecha_feriado:{
        type: Sequelize.DATE
      },
      desc_feriado: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('feriado');
  }
};
