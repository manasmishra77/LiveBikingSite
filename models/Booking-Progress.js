var mongoose = require('mongoose');

var BookingProgressSchema = new mongoose.Schema({
	bookingWorkDetail: [{type: Schema.Types.ObjectId, ref: 'BookingWork'}],
	estimatedWork: {type: String},
	workDone: {type: String},
	workTobeDone: {type: String},
	sparePartsUsed: {type: },
	engineOilUsed: {type: String},
	updated_at: Date,
	notDoneWork: {type: String},
	mmrStatus: {type: String}
});



