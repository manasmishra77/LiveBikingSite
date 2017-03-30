var mongoose = require('mongoose');

var BookingWorkSchema = new mongoose.Schema({
	serviceDetail: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
	userDetail: {type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail'},
	engineOilDetail: {type: mongoose.Schema.Types.ObjectId, ref: 'EngineOil'},
	sparePartsOrderedByUser: [String],
	coupon: {type: mongoose.Schema.Types.ObjectId, ref: 'Offer'},
	expectedDeliveryDate: {type: Date},
	serviceStartingDate: {type: Date},
	advancePaid: {type: Number},
	updated_at: Date,
	unique_Id: String,
	specialmention: String,
	unique_Id: {type: String, unique: String},	

});

var BookingWork = mongoose.model('BookingWork', BookingWorkSchema,'BookingWork');

module.exports = BookingWork;

