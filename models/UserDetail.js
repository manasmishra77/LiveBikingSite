var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserDetailSchema = new mongoose.Schema({
	fullName: {type: String, required: true},
	emailId: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	phoneNumber: {type: Number, required: true},
	offer: {type: mongoose.Schema.Types.ObjectId, ref: 'Offer'},
	updated_at: Date,
	bikeDetail: [{registrationNumber: String, bikeMakeModelId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserBikes'}}],
	address: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress'}],
	unique_Id: {type: String, unique: String},
});

var UserDetail = mongoose.model('UserDetail', UserDetailSchema,'UserDetail');

module.exports = UserDetail;

module.exports.registerUser = function(newUser, callback){
var userRegistered = new UserDetail({
	fullName: newUser.fullName,
	emailId: newUser.emailId,
	password: newUser.password,
	phoneNumber: newUser.phoneNumber,
	updated_at: newUser.updated_at,
	unique_Id: newUser.unique_Id
});
userRegistered.save(callback);
}

module.exports.getUserByUserName = function(username, callback){
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
module.exports.getUserByUniqueId = function(uniqueId, callback){
	UserDetail.findOne(uniqueId,callback);
}

