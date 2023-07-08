'use strict'

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Ruta de testeo
//Rutas públicas
api.post('/register', userController.register);
api.post('/login', userController.login);
//Rutas privadas
api.put('/update/:id', ensureAuth, userController.update);
api.delete('/delete/:id', ensureAuth, userController.delete);
api.get('/get', userController.getUsers);
//Rutas privadas solo para administrador
api.get('/test', [ensureAuth, isAdmin], userController.test);
api.post('/save', [ ensureAuth, isAdmin ], userController.save);

module.exports = api;