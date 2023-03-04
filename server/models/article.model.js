const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'El nombre del articulo es obligatorio']
	},
	imgUrl: {
		type: String,
		required: [true, 'Debe seleccionar una imagen']
	},
	price: {
		type: Number,
		required: [true, 'precio es requerido']
	},
	category: {
		type: String,
		required: [true, 'Necesita seleccionar una categoría']
	},
	description: {
		type: String
	},
	userId: { 
		type: Schema.Types.ObjectId, 
		ref: "User" },
	likes:{
        type: Number
	}
});

ArticleSchema.methods.setImgUrl = function setImgUrl (filename) {
	ArticleSchema.imgUrl = `http://localhost:8000/uploads/${filename}`
}

module.exports.Article = mongoose.model('Article', ArticleSchema);