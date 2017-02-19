var mongoose = require('mongoose');
var UserBikeSchema = new mongoose.Schema({

	bikeNumber: {type: String, required: true},
	engineNumber: {type: String},
	bikeModel: [{type: Schema.Types.ObjectId, ref: 'BikeMakeModel'}],
	orderHistory: [{type: Schema.Types.ObjectId, ref: 'BikeMakeModel'}],
	});

