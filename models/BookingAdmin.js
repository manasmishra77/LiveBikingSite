var mongoose = require('mongoose');

var BookingAdminSchema = new mongoose.Schema({
	bookingId: {type: mongoose.Schema.Types.ObjectId, ref: 'BookingWork'},
	estimationByMechanic: [{name: String, estimatedCost: String}],
	advancePaidAfterEstimation: {type: Number},
	estimatedDeliveryDate: {type: Date},
	mechanic: {type: mongoose.Schema.Types.ObjectId, ref: 'MechanicDetail'},
	supervisor: {type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeDetail'},
	bookingStatus: {type: String},
	statusReason: {type: String},
	itemToBePurchased: {type: String},
	itemPurchasedCost: [{name: String, cost: String}],
	engineOilUsed: {type: mongoose.Schema.Types.ObjectId, ref: 'EngineOil'},
	laborCost: [{name: String, cost: String}],
	futureWork: [{name: String, estimatedCost: String}],
	deliveryDate: Date,
	paymentMethod: String,
	paymentStatus: String,
	depositedInBank: String,
	feedback: String,
	updated_at: Date,
	unique_Id: {type: String, unique: String},	
	rework: [{date: Date, workDetail: String, mechanic: {type: mongoose.Schema.Types.ObjectId, ref: 'MechanicDetail'}, expense: Number}]
});

var BookingAdmin = mongoose.model('BookingAdmin', BookingAdminSchema,'BookingAdmin');

module.exports = BookingAdmin;

