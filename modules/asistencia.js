const express = require('express');
const modelos = require('../models/index');
const moment = require('moment');

exports.diasHabilesTrabajo = diasHabilesTrabajo;


async function diasHabilesTrabajo(fecha_ini,fecha_fin){
    return modelos.Feriado.findAll();
};