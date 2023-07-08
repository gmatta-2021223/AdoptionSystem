'use strict'

const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        uppercase: true,
        default: 'CREATED'
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Appointment', appointmentSchema);