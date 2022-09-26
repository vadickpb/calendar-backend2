const express = require('express');
require('dotenv').config()
const cors = require('cors')
const {dbConnection} = require('./database/config')

//Crear el servidor de express
const app = express();

// Base de datos
dbConnection()

//CORS
app.use(cors())

//Directorio publico
app.use (express.static('public')),

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'))
// CRUD: events
app.use('/api/events' ,require('./routes/events'))


//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT} `);
})