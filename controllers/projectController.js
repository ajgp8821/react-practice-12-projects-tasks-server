const Project = require('../models/Project');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.createProject = async(req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Crear un nuevo proyecto
        const project = new Project(req.body);

        // Guardar al creador vía jwt
        project.creator = req.user.id;

        // Guardamos el proyecto
        await project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Obtiene todos los proyectos del usuario actual
exports.getProjects = async(req, res) => {
    try {
        // console.log(req.user);
        const projects = await Project.find({ creator: req.user.id }).sort({ create: -1 })
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Actualizar nombre de un proyecto
exports.updateProyect = async(req, res) => {
    
    // Revisar si hay errores
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extraer la información del proyecto
    const { name } = req.body;
    const newProject = {};
    
    if (name) {
        newProject.name = name;
    }

    try {
        // Revisar el Id
        console.log(req.params.id);

        // Si el proyecto existe o no

        // Verificar el creador del proyecto

        // Actualizar
    } catch (error) {
        console.log('There whas an error');
        res.status(500).send('There was an error');
    }
}
