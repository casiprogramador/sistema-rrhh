'use strict';
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Usuarios', [{
            username: 'admin',
            estado: true,
            password: bcrypt.hashSync('12345', salt),
            rol_id: 1,
            ultingreso: new Date(),
            resetpwd: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: 'empleadoprueba',
            estado: true,
            password: bcrypt.hashSync('54321', salt),
            rol_id: 2,
            ultingreso: new Date(),
            resetpwd: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        queryInterface.bulkDelete('Rols', [{
            nombre: 'admin'
        }])
    }
};