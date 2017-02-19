var mongoose = require('mongoose');

var OfferSchema = new mongoose.Schema({
	offerName: {type: String, required: true},
	reason: {type: String, required: true},
	price: {type: Number, required: true},
	activeNess: {type: Boolean}
	
	});
var Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;



