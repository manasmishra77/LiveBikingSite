var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserDetailSchema = new mongoose.Schema({
	fullName: {type: String, required: true},
	emailId: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	phoneNumber: {type: Number, required: true},
	referralCode: {type: String},
	updated_at: Date,
	//bikes: [{type: Schema.Types.ObjectId, ref: 'UserBikes'}],
	address: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress'}]
});

var UserDetail = mongoose.model('UserDetail', UserDetailSchema);

module.exports = UserDetail;

module.exports.getUserByUserName = function(username, callback){
	console.log('Unknown user11111');
	var query = {emailId: username};
	UserDetail.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatched) {
    // res === true 
    if(err) throw err;
    console.log('is matched = '+ isMatched);
    callback(null, isMatched);
});
}
module.exports.getUserById = function(id, callback){
	UserDetail.findById(id, callback);
}

