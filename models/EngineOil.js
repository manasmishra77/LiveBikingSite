var mongoose = require('mongoose');
var EngineOilSchema = new mongoose.Schema({

	brand: {type: String, required: true},
	price: {type: Number, required: true},
	quantity: {type: String, required: true},
	specification: {type: String, required: true},
	aboutEngineOil: {type: String, required: true}
	});

var EngineOil = mongoose.model('EngineOil', EngineOilSchema);

module.exports = EngineOil;
