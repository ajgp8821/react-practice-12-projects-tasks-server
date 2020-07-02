// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usersControler = require('../controllers/usersController');

// Crear un usuario
// /api/users
router.post('/',
    usersControler.createUser
);

module.exports = router;
