var mongoose = require('mongoose');
var UserAddressSchema = new mongoose.Schema({

	residenceName: {type: String, required: true},
	roadOrLane: {type: String},
	majorLocality: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	pin: {type: Number, required: true},
	contactPerson: {type: String},
	contactNumber: {type: Number},
	updated_at: Date,

});

var UserAddress = mongoose.model('UserAddress', UserAddressSchema,'UserAddress');

module.exports = UserAddress;

module.exports.getListOfAddress = function(callback){
	UserAddress.find(callback);
}

module.exports.updateAddress = function(id,newAddress, callback){
		var updatedAddress = {
			residenceName: newAddress.residenceName,
			roadOrLane: newAddress.roadOrLane,
			majorLocality: newAddress.majorLocality,
			city: newAddress.city,
			state: newAddress.state,
			pin: newAddress.pin,
			contactPerson: newAddress.contactPerson,
			contactNumber: newAddress.contactNumber,
			updated_at: new Date(),
		}
		UserAddress.findOneAndUpdate({_id: id},updatedAddress, callback);
}
module.exports.addAddress = function(newAddress, callback){
		var newerAddress = UserAddress({
			residenceName: newAddress.residenceName,
			roadOrLane: newAddress.roadOrLane,
			majorLocality: newAddress.majorLocality,
			city: newAddress.city,
			state: newAddress.state,
			pin: newAddress.pin,
			contactPerson: newAddress.contactPerson,
			contactNumber: newAddress.contactNumber,
			updated_at: new Date(),
	  });
	newerAddress.save(callback);
	}	
}

module.exports.getById = function(id, callback){
	UserAddress.findById(id,callback);
}
module.exports.removeAddress = function(id, callback){
	UserAddress.remove({ _id: id}, callback);
}
