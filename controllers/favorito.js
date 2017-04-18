/*
	Controlador de favoritos, en este fichero se indican las funciones que se usaran al atacar
	según que rutas indicadas en routes/favorito.js.
*/
'use strict'

// Importamos el modelo favorito para tener acceso al objeto.
var Favorito = require('../models/favorito');

function prueba(req, res){
	var nombre = req.params.nombre ? req.params.nombre : 'SIN NOMBRE';

	res.status(200).send({message: 'Hola '+nombre});
}

function getFavorito(req, res){
	var favoritoId = req.params.id;

	Favorito.findById(favoritoId, function(err, favorito){
		if(err)
			res.status(500).send({message: 'Error al devolver el marcador'});
		else
			if(!favorito)
				res.status(404).send({message: 'No hay marcador'});
			else
				res.status(200).send({favorito});
	});
}

function getFavoritos(req, res){
	// Usamos el modelo favorito. Primer funcion where, segundo callback function.
	//     Favorito.find({}, (err, favoritos) => { ... })

	// Si queremos ordenador, simplemente metemos el find vacio, seguido por un sort con el 
	// campo por el que queremos ordenar y seguido de un exec con la función de callback.
	Favorito.find({}).sort('-_id').exec((err, favoritos) => {
		// Si hay un error devolvemos un 500.
		if(err)
			res.status(500).send({message: 'Error al listar los marcadores'});
		else
		// Si el array favoritos viene vacio..
			if(!favoritos)
				res.status(404).send({message: 'No hay marcadores'});
			else
			// Si todo está bien enviamos un status 200 y la lista de favs.
			res.status(200).send({favoritos});
	});
}

function saveFavorito(req, res){
	// Creamos un nuevo objeto favorito.
	var favorito = new Favorito();

	// Recogemos los datos que nos vienen por post en el body (name="title", ...).
	var params = req.body;

	// Igualamos los parametros del objeto favorito con los que nos vienen en el body.
	favorito.title = params.title;
	favorito.description = params.description;
	favorito.url = params.url;

	// Guardamos el objeto en la base de datos llamando al objeto favorito y la funcion save
	// que nos brinda mongoose automaticamente a los modelos.
	favorito.save((err, favoritoStored) => {
		if(err)
			res.status(500).send({message: 'Error al guardar el marcador.'});
		else
			res.status(200).send({favorito: favoritoStored});
	});
}

function updateFavorito(req, res){
	// Recogemos los parametros por url y por post
	var favoritoId = req.params.id;
	var update = req.body;
	
	// Update tiene la misma estructura que un obj Favorito, esto quiere decir que en el form
	// los names de los inputs tienen que ser iguales que en la bd, si no no serviría.
	// Con esta sentencia encontramos por id y updateamos (genio), el primer parametro es la id
	// (el _id de mongoDB que debemos de pasar por la url), el segundo es el objeto con los cambios
	// y el tercero es una función de callback.
	Favorito.findByIdAndUpdate(favoritoId, update, (err, favoritoUpdated) => {
		if(err)
			res.status(500).send({message: 'Error al actualizar el marcador'});
		else
			res.status(200).send({favorito: favoritoUpdated});
	});
}

function deleteFavorito(req, res){
	// Recogemos el parametro por url
	var favoritoId = req.params.id;

	Favorito.findById(favoritoId, function(err, favorito){
		if(err)
			res.status(500).send({message: 'Error al encontrar el marcador'});
		else
			if(!favorito)
				res.status(404).send({message: 'No hay marcador'});
			else
				favorito.remove(function(err){
					if(err)
						res.status(500).send({message: 'Error al elminar el marcador'});
					else
						res.status(200).send({message: 'Marcador eliminado'});
				})
	});
	
}

// Aqui indicamos las funciones que se podrán usar al importar el controlador en el archivo de rutas.
module.exports = {
	prueba,
	getFavorito,
	getFavoritos,
	saveFavorito,
	updateFavorito,
	deleteFavorito
}