const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extraer email y password
    const {email, password } = req.body;

    try {
        // Revisar que el usuario registrado sea único
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists'});
        }

        // Crear el nuevo usuario
        user = new User(req.body);

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Guardar usuario
        await user.save();

        // Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRET_WORD, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;
            // Mensaje de confirmación
            res.json({ token });
        })
        // Mensaje de confirmación
        // res.json({ msg: 'User successfully created' });

    } catch (error) {
        console.log(error);
        res.status(400).send('An unexpected error occurred');
    }
}
