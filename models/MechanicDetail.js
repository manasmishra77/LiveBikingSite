var mongoose = require('mongoose');
var MechanicDetailSchema = new mongoose.Schema({

	fullName: {type: String, required: true},
	mobileNumber: {type: Number, required: true},
	emergencyContactNumber: {type: Number, required: true},
	address: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress'},
	updated_at: Date,
	unique_Id: {type: String, unique: String},	
	

	//photo: {type: String},
	//identityProof: {type: binData , required: true},
	accountInfo: { accountNumber: Number,
		branchName: String,
		ifscCode: String,
		},
	joiningDate: String,
	salary: Number,
	post: String		
	});

var MechanicDetail = mongoose.model('MechanicDetail', MechanicDetailSchema,'MechanicDetail');

module.exports = MechanicDetail;
