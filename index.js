/*
	Este es el archivo de carga del servidor, el primer archivo que ser carga por defecto 
	al iniciar el proyecto con express.
*/
'use strict'

// Cargamos mongoose para conectar a mongodb, como es un modulo se especifica solo su nombre.
var mongoose = require('mongoose');

// Cargamos el app.js, fichero principal del servidor.
var app = require('./app.js');

// Declaramos el puerto, si hay variable de entorno pues se usa la misma, si no 3678.
var port = process.env.PORT || 3678;

// Con mongoose nos conectamos a la base de datos, el puerto por defecto es 27017, 
// 'node_angular2' es el nombre de la bd
mongoose.connect('mongodb://localhost:27017/node_angular2', (err, res) => {

	// Si hay algún error lo lanzamos, si no iniciamos el servidor.
	if(err){
		throw err;
	}else{	
		console.log('Conexion a mongodb correcta.');
		app.listen(port, function(){
			console.log('Funcionando');
		});		
	}
});

