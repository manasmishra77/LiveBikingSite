var mongoose = require('mongoose');

var BookingPaymentSchema = new mongoose.Schema({
	estimationDetail: [{type: Schema.Types.ObjectId, ref: 'BookingWork'}],
	paymentStatus: {type: String},
	advancePaid: {type: Number},
	coupon: {type: String},
});
