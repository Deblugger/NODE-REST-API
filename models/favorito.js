/*
	Modelo de favorito, este archivo será una especie de esquema de nuestros objetos guardados en mongodb
*/
'use strict'

// Cargamos mongoose para poder hacer las conexiones con la bd.
var mongoose = require('mongoose');

// Declaramos el esquema de mongoose que nos va a permitir hacer esquemas de los objetos
// para trabajar con mongodb
var Schema = mongoose.Schema;

// Creamos el tipo de dato Favorito para trabajar con la bd.
var FavoritoSchema = Schema({
	title: String,
	description: String,
	url: String
});

// Exportamos el Schema de mongoose indicando que es un modelo, cuando agamos un new favorito estaremos
// haciendo un new del Schema pudiendo asignar valores a sus propiedades.
module.exports = mongoose.model('Favorito', FavoritoSchema);