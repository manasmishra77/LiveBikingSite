var mongoose = require('mongoose');

var UserBookingSchema = new mongoose.Schema({
	serviceDetail: [{type: mongoose.Schema.Types.ObjectId, ref: 'Service'}],
	userDetail: {type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail'},
	bikeDetail: {registrationNumber: String, bikeModel: {type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail'}},
	engineOilDetail: {type: mongoose.Schema.Types.ObjectId, ref: 'EngineOil'},
	sparePartsOrderedByUser: [String],
	coupon: {type: mongoose.Schema.Types.ObjectId, ref: 'Offer'},
	expectedDeliveryDate: {type: Date},
	serviceStartingDate: {type: Date},
	updated_at: Date,
	unique_Id: String,
	specialMention: String,
	bookingId: {type: String, unique: String}

});

var UserBooking = mongoose.model('UserBooking', UserBookingSchema,'UserBooking');

module.exports = UserBooking;