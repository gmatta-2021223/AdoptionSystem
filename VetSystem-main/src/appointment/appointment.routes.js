'use strict'

const express = require('express');
const api = express.Router();
const appointmentController = require('./appointment.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

api.get('/test', appointmentController.test);
api.post('/create', ensureAuth, appointmentController.create);
api.get('/my/:id', ensureAuth, appointmentController.getAppointmentsByUser);
api.get('/getAppointments', [ensureAuth, isAdmin], appointmentController.getAppointments);
api.put('/update/:id', [ensureAuth, isAdmin], appointmentController.update);
api.put('/updateStatus/:id', [ensureAuth, isAdmin], appointmentController.updateStatus);

module.exports = api;