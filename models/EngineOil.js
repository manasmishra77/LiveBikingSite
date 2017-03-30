var mongoose = require('mongoose');
var EngineOilSchema = new mongoose.Schema({

	brand: {type: String, required: true},
	price: {type: Number, required: true},
	quantity: {type: String, required: true},
	specification: {type: String, required: true},
	aboutEngineOil: {type: String, required: true},
	unique_Id: {type: String, unique: String, required: true},	
	updated_at: Date,

	});

var EngineOil = mongoose.model('EngineOil', EngineOilSchema,'EngineOil');

module.exports = EngineOil;

module.exports.getListOfEngineOil = function(callback){
	EngineOil.find(callback);
}

module.exports.addEngineOil = function(newEngineOil, callback){
if((newEngineOil.update)=="true"){
		var updatedEngineOil = {
			brand: newEngineOil.brand,
			price: newEngineOil.price,
			quantity: newEngineOil.quantity,
			specification: newEngineOil.specification,
			aboutEngineOil: newEngineOil.aboutEngineOil,
			unique_Id: newEngineOil.unique_Id,
			updated_at: new Date()
		}
		EngineOil.findOneAndUpdate({unique_Id: newEngineOil.unique_Id},updatedEngineOil, callback);
	}
	else{
		var newerEngineOil = EngineOil({
		brand: newEngineOil.brand,
		price: newEngineOil.price,
		quantity: newEngineOil.quantity,
		specification: newEngineOil.specification,
		aboutEngineOil: newEngineOil.aboutEngineOil,
		unique_Id: newEngineOil.unique_Id,
		updated_at: new Date()
	  });
	newerEngineOil.save(callback);
	}
}
module.exports.getByUniqueId = function(uniqueId, callback){
	EngineOil.findOne(uniqueId,callback);
}
module.exports.deleteEngineOil = function(unique_Id, callback){
	EngineOil.remove({ unique_Id: unique_Id}, callback);
}
