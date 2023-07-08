'use strict'

const express = require('express');
const api = express.Router();
const animalController = require('./animal.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Rutas públicas
api.get('/test', animalController.test);

//Ruta privada solo de admin
api.post('/save', [ensureAuth, isAdmin], animalController.save);
api.get('/get', ensureAuth, animalController.getAnimals);
api.post('/search', ensureAuth, animalController.search);
//Actualizar

api.delete('/delete/:id', [ensureAuth, isAdmin], animalController.delete);

module.exports = api;