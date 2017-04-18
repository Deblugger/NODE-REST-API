/*
	Este es el archivo principal del servidor, aquí vamos a indicar lo que usa el servidor,
	las rutas, ...
*/

'use strict'

// Cargamos los modulos de express y body-parser, ambos fundamentales, 
// body-parser transforma los parametros de entrada en un objeto JSON
var express = require('express');
var bodyparser =  require('body-parser');

// Inicializamos el servidor en la variable app.
var app = express();

// En la variable api cargamos la ruta de favorito.
var api = require('./routes/favorito');

// Indicamos que por defecto coja la url y la transforma en JSON.
// urlencoded es como vienen de toda la vida de Dios los forms de html.
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Configuramos las cabeceras necesarias para una api.
app.use((req, res, next) => {
	// Procedencia, cabeceras permitidas, metodos permitidos, ...
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested- With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Request-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

// El servidor usa en localhost:3678/api las rutas indicadas en la variable api.
app.use('/api', api);
							
// Exportamos el fichero como un módulo para que se pueda usar en otras partes.
module.exports = app;
