var mongoose = require('mongoose');
var ServiceSchema = new mongoose.Schema({

	serviceName: {type: String, required: true},
	duration: {type: String, required: true},
	frequency: {type: String, required: true},
	price: {type: Number, required: true},
	aboutService: {type: String, required: true},
	includeWashing: {type: Boolean, required: true},
	updated_at: Date,
	unique_Id: {type: String, unique: String},	
	});

var Service = mongoose.model('Service', ServiceSchema,'Service');

module.exports = Service;
