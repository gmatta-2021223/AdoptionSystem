'use strict'

const Animal = require('../animal/animal.model');
const Appointment = require('./appointment.model');
const User = require('../user/user.model');
const animalInfo = ['name', 'age'];
const userInfo = ['name', 'surname'];

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running'});
}

exports.create = async(req, res)=>{
    try{
        //Capturar la data
        let data = req.body;
        //Capturar el id de la person logeada
        data.user = req.user.sub
        //Verificar que existe el animal
        let animalExist = await Animal.findOne({_id: data.animal})
        //Validar que esa mascota no tenga una cita con esa persona
        //Realizar la validación de la linea anterior en una sola búsqueda.

        let appointmentExist = await Appointment.findOne({
            $or: [{
                $and: [
                    {animal: data.animal},
                    {user: data.user}
                ]
            },{
                $and: [
                    {date: data.date},
                    {user: data.user}
                ] 
            }
            ]
        });
        if(appointmentExist) return res.status(400).send({message: 'Appointment already exist'});
        //El usuario solo puede tener una cita por día
        /* let dateExist = await Appointment.findOne({
            $and: [
                {date: data.date},
                {user: data.user}
            ]
        })
        if(dateExist) return res.status(400).send({message: 'Appointment already exist in this date'}); */
        //Crear la cita
        let appointment = new Appointment(data);
        await appointment.save();
        return res.send({message: 'Appointment created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating appointment'});
    }
}

//USUARIO
exports.getAppointmentsByUser = async(req, res)=>{
    try{ 
        let userId = req.params.id;
        let userLogged = req.user.sub;

        if(userId != userLogged) return res.status(403).send({message: 'User unauthorized'});
        let appointments = await Appointment.find({user: userLogged}, {user: 0})
            .populate('animal', animalInfo)
        if(appointments.length === 0) return res.status(404).send({message: 'Appointments not found'});
        return res.send({appointments});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting appointments'});
    }
}

exports.delete = async(req, res)=>{

}


//FUNCIONES DE ADMIN
exports.getAppointments = async(req, res)=>{
    try{
        let data = req.body;
        if( data.value){
            let appointments = await Appointment.find({date: data.value})
                .populate('animal', animalInfo)
                .populate('user', userInfo)
            if(appointments.length === 0) return res.status(418).send({message: 'Appointments not found'});
            return res.send({appointments});
        }else{
            return res.status(400).send({message: 'Invalid params'});
        }
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting appointments'});
    }
}

exports.update = async(req, res)=>{
    try{
        //capturar el id de la cita
        let appointmentId = req.params.id;
        //obtener la data a actualizar
        let data = req.body;
        let appointment = await Appointment.findOne({_id: appointmentId});
        if(!appointment) return res.status(404).send({message: 'Appointment not found'});
        //validar que no venga usuario y estatus
        if(data.user || data.status) return res.status(400).send({message: 'Some params are not acepted'});
        //Validar que no tenga una cita con ese animal
        //Validar que no tenga una cita en esa fecha
        let appointmentExistAnimal = await Appointment.findOne({
                $and: [
                    {animal: data.animal},
                    {user: appointment.user}
                ]
        })
        let appointmentExistDate = await Appointment.findOne({
            $and: [
                {date: data.date},
                {user: appointment.user}
            ]
        })
        //if(appointmentExistAnimal && appointmentExistAnimal._id != appointment._id) return res.send({message: 'Appointment already exist on this date or with this animal'});
        if(
            appointmentExistAnimal && 
            !appointmentExistAnimal._id.equals(appointment._id)
        ) return res.send({message: 'Appointment already exist with this animal'});
        if(
            appointmentExistDate && 
            !appointmentExistDate._id.equals(appointment._id)
        ) return res.send({message: 'Appointment already exist on this date'});
        //Actualizar
        let updatedAppointment = await Appointment.findOneAndUpdate(
            {_id: appointmentId}, 
            data, 
            {new: true}
        )
            . populate('user', userInfo)
            .populate('animal', animalInfo)
        if(!updatedAppointment) return res.status(404).send({message: 'Appointment not found, not updated'});
        return res.send({message: 'Appointment updated sucessfully', updatedAppointment});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating appointment'});
    }
}

exports.updateStatus = async(req, res)=>{
    try{
        //capturar el id de la cita
        let appointmentId = req.params.id;
        //capturar el valor
        let { status } = req.body;
        //Verificar que sea un estatus válido. (CREATED, CONFIRMED, CANCELLED)
        if( !status ||
            !(
                status == 'CREATED' ||
                status == 'CONFIRMED' ||
                status == 'CANCELLED'
            )   
        ) return res.status(418).send({message: 'Invalid status'});
        console.log(status)
        //actualizar solo el dato importante
        let updatedStatus = await Appointment.findOneAndUpdate(
            {_id: appointmentId},
            { status: status },
            {new: true}
        )
            .populate('user', userInfo)
            .populate('animal', animalInfo)
        if(!updatedStatus) return res.status(418).send({message: 'Appointment not found, not updated'});
        return res.send({message: 'Status updated sucessfully', updatedStatus});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating status'});
    }
}