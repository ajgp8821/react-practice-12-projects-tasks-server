const express = require('express');
const conectDB = require('./config/db');

// Crear el servidor
const app = express();

// Conectar a la DB
conectDB();

// Habilitar express.json
app.use( express.json({ extended: true }));

// Puerto de la app
const PORT = process.env.port || 4000;

// Página principal
// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

// Importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

// Iniciamos el servidor
app.listen(PORT, () =>{
    console.log(`Server running in port ${PORT}`);
})

// npm run dev, por la configuración del package.json
