var mongoose = require('mongoose');

var BookingWorkSchema = new mongoose.Schema({
	userDetail: [{type: Schema.Types.ObjectId, ref: 'UserDetail'}],
	serviceDetail: [{type: Schema.Types.ObjectId, ref: 'Service'}],
	engineOilDetail: [{type: Schema.Types.ObjectId, ref: 'EngineOil'}],
	sparePartsOrderedByUser: {type: String},
	coupon: {type: String},
	updated_at: Date,
	//progressStatus: [{type: Schema.Types.ObjectId, ref: 'BookingReport'}],
	//paymentStatus: [{type: Schema.Types.ObjectId, ref: 'BookingPayment'}]
	//bookingStatus: {type: String, required: true},
	//bookingStatusReason: {type: String, required: true},
	deliveryDate: {type: Date, required: true},
	serviceStartingDate: {type: Date, required: true},
	mechanic: [{type: Schema.Types.ObjectId, ref: 'MechanicDetail'}],
	superVisor: [{type: Schema.Types.ObjectId, ref: 'EmployeeDetail'}]
});

var BookingWork = mongoose.model('BookingWork', BookingWorkSchema);

module.exports = BookingWork;

