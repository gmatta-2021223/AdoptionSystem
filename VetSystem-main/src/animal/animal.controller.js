'use strict'

const Animal = require('./animal.model');
const User = require('../user/user.model');
const { validateData, checkUpdate } = require('../utils/validate');
const infoUser = ['name', 'surname']

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

exports.save = async(req, res)=>{
    try{
        //Capturar los datos del formulario
        let data = req.body;
        //Validar que el usuario exista
        let user = await User.findOne({_id: data.user});
        //Validar que exista y que sea rol ADMIN
        if(!user || user.role != 'ADMIN') return res.status(404).send({message: 'User not found or you dont have permission'});
        //Crear la isntancia
        let animal = new Animal(data);
        //Guardar
        await animal.save()
        //Responder
        return res.send({message: 'Animal saved sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error saving animal'});
    }
}

exports.getAnimals = async(req, res)=>{
    try{
        let animals = await Animal.find().populate('user');
        return res.send({animals});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Errpr getting animals'});
    }
}

exports.search = async(req, res)=>{
    try{
        let params = {
            name: req.body.name
        }
        let validate = validateData(params)
        if(validate) return res.status(400).send(validate);
        let animals = await Animal.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        }).populate('user', data)
        return res.send({animals})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching animal'});
    }
}

exports.update = async(req, res)=>{
    try{
        //capturar la data a actualizar
        let data = req.body;
        //capturar el id del animal
        let animalId = req.params.id;
        //Validar que vengan datos
        //Validar que no se pueda actualizar el encargado
        let update = checkUpdate(data);
        if(!update) return res.status(404).send({message: 'You have submitted data that cannot be updated'});
        //Actualizar
        //Eliminar la info sensible
        let updatedAnimal = await Animal.findOneAndUpdate(
            {_id: animalId},
            data,
            {new: true}
        ).populate('user', infoUser);
        //Validar la actualización
        if(!updatedAnimal) return res.status(404).send({message: 'Not found, not updated'});
        //Responder con el dato actualizado
        return res.send({message: 'Animal updated sucessfully', updatedAnimal});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating animal'});
    }
}

exports.delete = async(req, res)=>{
    try{
        //MÁS ADELANTE | Antes de eliminar el animal, ver si no tiene citas activas (Hoy o más adelante)
        //Capturar el id del animal
        let animalId = req.params.id;
        //Validar que exista el animal
        //Eliminarlo
        /* let deletedAnimal = await Animal.findOneAndDelete({_id: animalId}); //Devolver el objeto eliminado
        if(!deletedAnimal) return res.status(404).send({message: 'Animal not found, not deleted'}); */
        let deletedAnimal = await Animal.deleteOne({_id: animalId}) //No devuelve el documento
        if(deletedAnimal.deletedCount === 0) return res.status(404).send({message: 'Animal not found, not deleted'});
        return res.send({message: 'Animal deleted'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting animal'});
    }
}