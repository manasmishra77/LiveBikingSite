var mongoose = require('mongoose');

var OfferSchema = new mongoose.Schema({
	offerName: {type: String, required: true},
	reason: {type: String, required: true},
	price: {type: Number, required: true},
	activeNess: {type: Boolean},
	updated_at: Date,
	offerId: {type: String, unique: true, required: true}
	});
var Offer = mongoose.model('Offer', OfferSchema, 'Offer');

module.exports = Offer;

module.exports.getListOfOffer = function(callback){
	Offer.find(callback);
}

module.exports.addOffers = function(newOffer,unique_Id, callback){
		var newerOffer = Offer({
		offerName: newOffer.offerName,
		reason: newOffer.reason,
		price: newOffer.price,
		activeNess: newOffer.activeNess,
		offerId: offerId,
		updated_at: new Date()
	  });
	newerOffer.save(callback);
}
module.exports.updateOffers = function(id, newOffer,callback){
	var updatedOffer = {
			offerName: newOffer.offerName,
			reason: newOffer.reason,
			price: newOffer.price,
			activeNess: newOffer.activeNess,
			updated_at: new Date(),
			offerId: newOffer.offerId
		}
		Offer.update({_id: id}, updatedOffer, callback);
}
module.exports.getByUniqueId = function(uniqueId, callback){
	Offer.findOne(uniqueId,callback);
}
module.exports.removeOffers = function(id, callback){
	Offer.remove({ _id: id}, callback);
}




