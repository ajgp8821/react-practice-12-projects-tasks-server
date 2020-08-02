const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');
    // console.log(token);

    // Revisar si no hay token
    if (!token) {
        res.status(401).json({msg: "There is no token, permission denied"});
    }

    // Validar el token
    try {
        const encrypted = jwt.verify(token, process.env.SECRET_WORD);
        req.user = encrypted.user;
        next();
    } catch (error) {
        res.status(401).json({msg: "Permission denied"})
        console.log
    }
}
