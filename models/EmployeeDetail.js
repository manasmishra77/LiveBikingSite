var mongoose = require('mongoose');

var EmployeeDetailSchema = new mongoose.Schema({
	fullname: {type: String, required: true},
	emailId: {type: String, required: true, unique: true},
	post: {type: String, required: true},
	phoneNumber: {type: Number, required: true},
	//identityProof: {type: String},
	personalInfo: { name: String,
					address: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress'},
					emergencyContactNumber: Number
				    },
	//offerLetter: [{type: Schema.Types.ObjectId, ref: 'UserBikes'}],
	joiningStatus: {type:String,required:true},
	joiningDate: Date,
	accountInfo: { accountNumber: Number,
		branchName: String,
		ifscCode: String,
		},
	updated_at: Date,
	unique_Id: {type: String, unique: String},	
	

});

var EmployeeDetail = mongoose.model('EmployeeDetail', EmployeeDetailSchema,'EmployeeDetail');

module.exports = EmployeeDetail;

module.exports.getListOfEmoloyees = function(callback){
	EmployeeDetail.find(callback);
}

module.exports.updateEmployee = function(id, newEmployee, callback){
		var updatedEmployee = {
			fullname: newEmployee.fullname,
			emailId: newEmployee.emailId,
			post: newEmployee.post,
			phoneNumber: newEmployee.phoneNumber,
			personalInfo: newEmployee.personalInfo,
			joiningStatus: newEmployee.joiningStatus,
			joiningDate: newEmployee.joiningDate,
			accountInfo: newEmployee.accountInfo,
			updated_at: new Date(),
			unique_Id: newEmployee.unique_Id 
			}
		EngineOil.findOneAndUpdate({unique_Id: newEmployee.unique_Id},updatedEmployee, callback);
}
module.exports.addEmployee = function(newEmployee, callback){
		var newerEmployee = EmployeeDetail({
			fullname: newEmployee.fullname,
			emailId: newEmployee.emailId,
			post: newEmployee.post,
			phoneNumber: newEmployee.phoneNumber,
			personalInfo: newEmployee.personalInfo,
			joiningStatus: newEmployee.joiningStatus,
			joiningDate: newEmployee.joiningDate,
			accountInfo: newEmployee.accountInfo,
			updated_at: new Date(),
			unique_Id: newEmployee.unique_Id 
		});
	newerEmployee.save(callback);
}

module.exports.getByUniqueId = function(uniqueId, callback){
	var uniqueIdDict = {unique_Id: uniqueId}
	EmployeeDetail.findOne(uniqueIdDict,callback);
}
module.exports.remove = function(id, callback){
	EngineOil.remove({ _id: id}, callback);
}


