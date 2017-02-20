var mongoose = require('mongoose');
var BikeMakeModelSchema = new mongoose.Schema({

	company: {type: String, required: true},
	model: {type: String, required: true},
	modelSpecification: {type: String, required: true},
	yearOfManufacture: {type: Number, required: true},
	cc: {type: String, required:true},
	aboutModel: {type: String}
	});
var BikeMakeModel = mongoose.model('BikeMakeModel', BikeMakeModelSchema);

module.exports = BikeMakeModel;

module.exports.getListOfBikes = function(callback){
	BikeMakeModel.find(callback);
}