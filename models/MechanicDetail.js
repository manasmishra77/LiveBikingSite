var mongoose = require('mongoose');
var MechanicDetailSchema = new mongoose.Schema({

	fullName: {type: String, required: true},
	mobileNumber: {type: Number, required: true},
	emergencyContactNumber: {type: Number, required: true},
	addresses: [{type: Schema.Types.ObjectId, ref: 'UserAddress'}],
	//photo: {type: String},
	//identityProof: {type: binData , required: true},
	accountInfo: { accountNumber: Number,
		branchName: String,
		ifscCode: String,
		}
	});

var MechanicDetail = mongoose.model('MechanicDetail', MechanicDetailSchema);

module.exports = MechanicDetail;
