var mongoose = require('mongoose');

var EmployeeDetailSchema = new mongoose.Schema({
	fullname: {type: String, required: true},
	emailId: {type: String, required: true, unique: true},
	post: {type: String, required: true},
	phoneNumber: {type: Number, required: true},
	//identityProof: {type: String},
	personalInfo: { name: String,
					address: String
					emergencyContactNumber: Number

				    }
	//offerLetter: [{type: Schema.Types.ObjectId, ref: 'UserBikes'}],
	joiningStatus: {type:String,required:true},
	joiningDate: Date,
	accountInfo: { accountNumber: Number,
		branchName: String,
		ifscCode: String,
		}

});

var EmployeeDetail = mongoose.model('EmployeeDetail', EmployeeDetailSchema);

module.exports = EmployeeDetail;

