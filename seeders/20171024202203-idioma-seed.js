'use strict';
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Idiomas', [
      {idioma : 'Español', createdAt : new Date(), updatedAt : new Date()},
      {idioma : 'Ingles', createdAt : new Date(), updatedAt : new Date()}
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Rols', [{
      idioma :'ingles'
    }])
  }
};
