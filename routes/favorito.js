/*
	Archivo de rutas de favoritos, en este tipo de archivos se indican las rutas a las que se atacan
	y las funciones que usan dichas rutas. Para ello, cargamos un controlador y asociamos las funciones
	del mismo a las rutas que queramos.
*/
'use strict'

// Cargamos express y el controlador, el controlador al ser un archivo neesita que se le indique la ruta
var express = require('express');
var FavoritoController = require('../controllers/favorito');

// Le indicamos a express que api es un Router y va a dirigir el trafico de la app.
var api = express.Router();

// Indicamos en api las diferentes rutas y metodos que se usaran.
api.get('/prueba/:nombre?', FavoritoController.prueba);
api.get('/favorito/:id', FavoritoController.getFavorito);
api.get('/favoritos', FavoritoController.getFavoritos);
api.post('/favorito', FavoritoController.saveFavorito);
api.put('/favorito/:id', FavoritoController.updateFavorito);
api.delete('/favorito/:id', FavoritoController.deleteFavorito);

// Exportamos el router como un modulo para usarlo en app.js, el archivo principal.
module.exports = api;