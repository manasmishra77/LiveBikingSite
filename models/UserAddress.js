var mongoose = require('mongoose');
var UserAddressSchema = new mongoose.Schema({

	residenceName: {type: String, required: true},
	roadOrLane: {type: String},
	majorLocality: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	pin: {type: Number, required: true},
	contactPerson: {type: String},
	contactNumber: {type: Number, required: true}
});

var UserAddress = mongoose.model('UserAddress', UserAddressSchema);

module.exports = UserAddress;
