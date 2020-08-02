// Rutas para crear autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Crear un usuario
// /api/auth
router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
    ],
    authController.authUser
);

module.exports = router;
