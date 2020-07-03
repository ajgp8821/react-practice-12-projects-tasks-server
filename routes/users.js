// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usersControler = require('../controllers/usersController');
const { check } = require('express-validator');

// Crear un usuario
// /api/users
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
    ],
    usersControler.createUser
);

module.exports = router;
