/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');



//Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());



// Directorio Público
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/clients', require('./routes/clients'));
app.use('/api/auth', require('./routes/auth'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});