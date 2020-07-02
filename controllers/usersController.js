const User = require('../models/User');

exports.createUser = async (req, res) => {

    // Extraer email y password
    const {email, password} = req.body;

    try {
        // Revisar que el usuario registrado sea único
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists'});
        }

        // Crear el nuevo usuario
        user = new User(req.body);

        // Guardar usuario
        await user.save();

        // Mensaje de confirmación
        res.json({ msg: 'User successfully created'});
    } catch (error) {
        console.log(error);
        res.status(400).send('An unexpected error occurred');
    }
}
