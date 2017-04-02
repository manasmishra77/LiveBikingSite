var mongoose = require('mongoose');
var BikeMakeModelSchema = new mongoose.Schema({

	company: {type: String, required: true},
	model: {type: String, required: true},
	modelSpecification: {type: String, required: true},
	yearOfManufacture: {type: Number, required: true},
	cc: {type: String, required:true},
	aboutModel: {type: String},
	unique_Id: {type: String, unique: String},
	updated_at: Date

	});
var BikeMakeModel = mongoose.model('BikeMakeModel', BikeMakeModelSchema,'BikeMakeModel');

module.exports = BikeMakeModel;

module.exports.getListOfBikes = function(callback){
	BikeMakeModel.find(callback);
}

module.exports.addBikes = function(newBike, callback){
	var newerBike = BikeMakeModel({
		company: newBike.company,
		model: newBike.model,
		modelSpecification: newBike.modelSpecification,
		yearOfManufacture: newBike.yearOfManufacture,
		cc: newBike.cc,
		aboutModel:newBike.about,
		unique_Id: newBike.unique_Id,
		updated_at: new Date()
	});
	newerBike.save(callback);
}
module.exports.updateBikes = function(id, body, callback){
	var newBody = {
		company : body.company,
		model : body.model,
		modelSpecification : body.modelSpecification,
		yearOfManufacture : body.yearOfManufacture,
		cc : body.cc,
		aboutModel : body.aboutModel,
		unique_Id: body.unique_Id,
		updated_at: new Date(),
	}
	BikeMakeModel.update({ _id: id }, { $set: newBody}, callback);
}
module.exports.getByUniqueId = function(uniqueId, callback){
	var uniqueIdDict = {unique_Id: uniqueId}
	BikeMakeModel.findOne(uniqueIdDict,callback);
}
module.exports.removeUser = function(id, callback){
	BikeMakeModel.remove({ _id: id },callback);
}
