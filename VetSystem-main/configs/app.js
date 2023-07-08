'use strict'

const express = require('express');
//Logs de las solicitudes que recibe el servidor
const morgan = require('morgan');
//Aplica seguridad básica al servidor
const helmet = require('helmet');
//Aceptación de solicitudes desde otro sistema o desde la misma máquina
const cors = require('cors');
//Instancia de express
const app = express();
const port = process.env.PORT || 3500;
const userRoutes = require('../src/user/user.routes');
const animalRoutes = require('../src/animal/animal.routes');
const appointmentRoutes = require('../src/appointment/appointment.routes');

//CONFIGURAR EL SERVIDOR HTTP DE EXPRESS
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/user', userRoutes);
app.use('/animal', animalRoutes);
app.use('/appointment', appointmentRoutes);

//Función donde se levanta el servidor
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}