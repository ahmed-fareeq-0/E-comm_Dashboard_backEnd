const mongoose = require('mongoose');

const PrdouctsSchema = new mongoose.Schema({
	title:String,
	price:String,
	category:String,
	userId:String,
	company:String
})

module.exports = mongoose.model('products', PrdouctsSchema)