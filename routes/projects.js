// Rutas para crear Proyectos
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear proyectos
// /api/projects
router.post('/',
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.createProject
);

// Obtener todos los proyectos
router.get('/',
    auth,
    projectController.getProjects
);

// Actualizar proyecto byId
router.put('/:id',
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.updateProyect
);

module.exports = router;
