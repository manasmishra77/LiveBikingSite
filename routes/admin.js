var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var newBikeModel = require('../models/BikeMakeModel.js');
var newEngineOilModel = require('../models/EngineOil.js');
var newOffers = require('../models/offers.js');
var utilities = require('../public/utilities/GeneralMethods.js');
var employeeDetail = require('../models/EmployeeDetail.js');
var addressDetail = require('../models/UserAddress.js');


//admin page
router.get('/', function(req,res){

	
});

//authentication
router.post('/', function(req, res){
	var userName = req.body.userName;
	var password = req.body.password;

	if (userName == "admin@livebiking.in"){
		if (password == "admin@678"){
			 var token = jwt.sign({data: userName}, 'superSecret', {
			 	expiresIn: '96h' // expires in 24 hours
			 });
			//res.json({ "code": 200, "status": "success", "token": token });
			res.json({"code": 200, "status": "success", "token": token});

		}else{
			res.json({"code": 500, "status": "Error", "data": "Wrong password"});
		}
	}else{
			res.json({"code": 500, "status": "Error", "data": "Wrong use id"});
	}
});
//Checking authentication
router.use(function(req,res,next){
var token = req.body.token || req.query.token || req.headers['x-acess-token'];
if(token){
	jwt.verify(token, 'superSecret', function(err, decoded){
		if(err){
			return res.redirect('/admin');
		}else{
			req.decoded = decoded;
			next();
		}
	});
}else{
	res.redirect('/admin');
}
});

//Delivering Admin-dashboard page
router.get('/dashboard', function(req, res){
	res.json({"hi":"hi"});
});


//bike make and model page
router.get('/dashboard/bikemake', function(req,res){
	res.render('addbikemakemodel');
});

router.get('/dashboard/bikemake/bikelist', function(req,res){
 newBikeModel.getListOfBikes(function(err, user){
	if(err){
		res.json({"code": 500, "status": "Error", "data": err});
	}else{
		res.json({"code": 200, "status": "success", "data": user});
	}
	});
	
});
router.post('/dashboard/bikemake/bikeinsert', function(req,res){

	if (req.body.update == false){
		generateUniqueId(newBikeModel,5, function(unique_Id){
			if(unique_Id=="retry"){
				res.json({ "code": 500, "status": "Error", "data":"Retry" });
			}else{
				req.body.unique_Id = unique_Id;
				newBikeModel.addBikes(req.body, function(err,user){
				if(err) 
				{
					res.json({ "code": 500, "status": "Error", "data": err });
	
				}else{
	 				res.json({ "code": 200, "status": "success", "data": {"unique_Id": user.unique_Id, "updated_at": user.updated_at}});
				}
				});
			}
		});
	}else if(req.body.update == true){
		newBikeModel.getByUniqueId(req.body.unique_Id, function(err, user){
			if(err){
				res.json({ "code": 500, "status": "Error", "data": err });
			}else{
				if(user){
						newBikeModel.updateBikes(user.id, req.body, function(err, data){
							if(err){
								res.json({ "code": 500, "status": "Error", "data": err });
							}else{
								res.json({ "code": 200, "status": "success", "data": {"unique_Id": req.body.unique_Id, "updated_at": new Date()}});
							}
						});
				}else{
					res.json({ "code": 500, "status": "Error", "data": "User Not Found!!!" });
				}
			}

		});
	}else{
			res.json({ "code": 404, "status": "Error", "data": "Body is not found" });
	}

	});
	router.delete('/dashboard/bikemake/bikeinsert', function(req, res){
	if(req.body.unique_Id){
	newBikeModel.getByUniqueId(req.body.unique_Id, function(err,user){
		if(err){
				res.json({ "code": 500, "status": "Error", "data": err });
			}else{
				if(user){
						newBikeModel.removeUser(user.id, function(err, data){
							if(err){
								res.json({ "code": 500, "status": "Error", "data": err });
							}else{
								res.json({ "code": 200, "status": "success", "data": data});
							}
						});
				}else{
					res.json({ "code": 500, "status": "Error", "data": "User Not Found!!!" });
				}
			}
	});
	}else{
		res.json({ "code": 404, "status": "Error", "data": "Body is not found" });
	}
});

//Employee Detail 
router.get('/dashboard/employees', function(req,res){
	res.render('employeeDetail');
});
router.get('/dashboard/employeelist', function(req,res){
	employeeDetail.getListOfEmoloyees(function(err, user){
		if(err){
			res.json({"code": 500, "status": "Error", "data": err});
		}else{
			res.json({"code": 200, "status": "success", "data": user});
		}
		});
});
router.get('/dashboard/employees/each', function(req,res){
	res.render('employeeDetail');
});
router.post('/dashboard/employee', function(req, res){
	if(req.body.update == false){
		generateUniqueId(employeeDetail,7, function(unique_Id){
			if(unique_Id=="retry"){
				res.json({ "code": 500, "status": "Error", "data":"Retry" });
			}else{
				req.body.unique_Id = unique_Id;
				var employeeAddress = req.body.personalInfo.address;
				addressDetail.addAddress(employeeAddress, function(err, address){
					if(err){
						res.json({ "code": 500, "status": "Error", "data": err });
					}else{
						req.body.personalInfo.address = address.id;
						employeeDetail.addEmployee(req.body, function(err, employee){
							if(err){
								addressDetail.removeAddress(address.id, function(err, data){
									res.json({ "code": 500, "status": "Error", "data": err });
								});	
							}else{
								res.json({ "code": 200, "status": "success", "data": {"updated_at": employee.updated_at, "unique_Id": employee.unique_Id}});
							}
							
						});
					}
				});

				}
		});
	}else if(req.body.update == true){
		employeeDetail.getByUniqueId(req.body.unique_Id, function(err, employee){
			if(err){
				res.json({ "code": 500, "status": "Error", "data": err });
			}else{
				if(employee){
					addressDetail.updateAddress(employee.personalInfo.address, req.body.personalInfo.address, function(err, data){
						if(err){
							res.json({ "code": 500, "status": "Error", "data": err });
						}else{
							req.body.personalInfo.address = employee.body.personalInfo.address;
							employeeDetail.updateEmployee(employee.id, req.body, function(err,data){
								if(err){
									res.json({ "code": 500, "status": "Error", "data": err });
								}else{
									res.json({ "code": 200, "status": "success", "data": {"updated_at": new Date(), "unique_Id": employee.unique_Id}});
								}
							});
						}
					});

				}else{
					res.json({ "code": 500, "status": "Error", "data": "User Not Found" });
				}
			}
		});

	}else{
		res.json({ "code": 404, "status": "Error", "data": "Body is not found" });
	}
});
router.delete('/dashboard/employee', function(req, res){
	employeeDetail.getByUniqueId(req.body.unique_Id, function(err, employee){
			if(err){
				res.json({ "code": 500, "status": "Error", "data": err });
			}else{
				if(employee){
					addressDetail.remove(employee.personalInfo.address, function(err, data){
						if(err){
							res.json({ "code": 500, "status": "Error", "data": err });
						}else{
							employeeDetail.remove(employee.id, function(err,data){
								if(err){
									res.json({ "code": 500, "status": "Error", "data": err });
								}else{
									res.json({ "code": 200, "status": "success", "data": data});
								}
							});
						}
					});

				}else{
					res.json({ "code": 500, "status": "Error", "data": "User Not Found" });
				}
			}
		});
	});

//Offer Page
router.get('/dashboard/offers', function(req,res){
	res.render('offers');
});

router.get('/dashboard/offers/offerlist', function(req,res){
 newOffers.getListOfOffer(function(err, user){
	if(err){
		res.json({"code": 500, "status": "Error", "data": err});
	}else{
		res.json({"code": 200, "status": "success", "data": user});
	}
	});
	
});
router.post('/dashboard/offers/offerinsert', function(req,res){

	if (req.body.update == false){
				req.body.unique_Id = unique_Id;
				newOffers.addOffers(req.body, function(err,user){
				if(err) 
				{
					res.json({ "code": 500, "status": "Error", "data": err });
	
				}else{
	 				res.json({ "code": 200, "status": "success", "data": {"unique_Id": user.offerId, "updated_at": user.updated_at}});
				}
				});
			}
	else if(req.body.update == true){
		newOffers.getByUniqueId(req.body.offerId, function(err, user){
			if(err){
				res.json({ "code": 500, "status": "Error", "data": err });
			}else{
				if(user){
						newOffers.updateOffers(user.id, req.body, function(err, data){
							if(err){
								res.json({ "code": 500, "status": "Error", "data": err });
							}else{
								res.json({ "code": 200, "status": "success", "data": {"offerId": req.body.offerId, "updated_at": new Date()}});
							}
						});
				}else{
					res.json({ "code": 500, "status": "Error", "data": "Offer Not Found!!!" });
				}
			}

		});
	}else{
			res.json({ "code": 404, "status": "Error", "data": "Body is not found" });
	}

	});
router.delete('dashboard/offers/offerinsert', function(req, res){
	if(req.body.offerId){
		newOffers.getByUniqueId(req.body.offerId, function(err,user){
		if(err){
				res.json({ "code": 500, "status": "Error", "data": err });
			}else{
				if(user){
						newOffers.removeOffers(user.id, function(err, data){
							if(err){
								res.json({ "code": 500, "status": "Error", "data": err });
							}else{
								res.json({ "code": 200, "status": "success", "data": data});
							}
						});
				}else{
					res.json({ "code": 500, "status": "Error", "data": "Offer Not Found!!!" });
				}
			}
	});
	}else{
		res.json({ "code": 404, "status": "Error", "data": "Body is not found" });
	}
});



//Engine Oil page
router.get('/engineoil', function(req,res){
	res.render('engineoil');
	
});

router.get('/engineOil1', function(req,res){
 newEngineOilModel.getListOfEngineOil(function(err, user){
 	res.json({ "code": 200, "status": "success", "data": user });
	 	});
});
router.delete('/engineoil', function(req,res){
 newEngineOilModel.deleteEngineOil(req.body.unique_Id, function(err){
 		if(err) 
	 		res.json({ "code": 500, "status": err });
 				
	 	else{ 
	 		res.json({ "code": 200, "status": "success" });
	 	}

	});
});

router.post('/engineoil', function(req,res){
	if((req.body.update)=='false'){
		generateUniqueId(newEngineOilModel,5, function(unique_Id){
			if(unique_Id=="retry"){
				res.json({ "code": 500, "status": "retry" });
			}
			else{
				req.body.unique_Id = unique_Id;
				newEngineOilModel.addEngineOil(req.body, function(err,user){
				if(err) 
				{
					res.json({ "code": 500, "status": err });
	
				}else{
	 				res.json({ "code": 200, "status": "success" });
				}
				});
			}

		});
	}else{
		var unique_Id = req.body.unique_Id;
		newEngineOilModel.addEngineOil(req.body, function(err,user){
		if(err) 
		{
			res.json({ "code": 500, "status": err });
	
		}else{
	 			res.json({ "code": 200, "status": "success" });
			}
		});		
	}
});

//Offers page
router.get('/offers', function(req,res){
	res.render('offers');	
});

router.get('/offer1', function(req,res){
 newOffers.getListOfOffer(function(err, user){
 	res.json({ "code": 200, "status": "success", "data": user });
	 	});
});
router.delete('/offers', function(req,res){
 newOffers.deleteOffers(req.body.unique_Id, function(err){
 		if(err) {
			res.json({ "code": 500, "status": err });
 				}
	 	else{ 
	 			res.json({ "code": 200, "status": "success" });
	 	}

	});
});

router.post('/offers', function(req,res){
	 if((req.body.update)=='false'){
		generateUniqueId(newOffers,5, function(unique_Id){
			if(unique_Id=="retry"){
				res.json({ "code": 500, "status": "retry" });
			}
			else{
				req.body.unique_Id = unique_Id;
				console.log(req.body);
				newOffers.addOffers(req.body, unique_Id, function(err,user){
				if(err) 
				{
					res.json({ "code": 500, "status": err });
	
				}else{
					console.log("In offer111122");
	 				res.json({ "code": 200, "status": "success" });
				}
				});
			}

		});
	}else{
		var unique_Id = req.body.unique_Id;
		newOffers.addOffers(req.body, unique_Id, function(err,user){
		if(err) 
		{
			res.json({ "code": 500, "status": err });
	
		}else{
				console.log("In offer111122");
	 			res.json({ "code": 200, "status": "success" });
			}
		});
		
	}
});

//Employee List Page
router.get('/employee', function(req,res){
	res.render('employee');	
});

router.get('/employee1', function(req,res){
 employeeDetail.getListOfEmoloyees(function(err, user){
 	res.json({ "code": 200, "status": "success", "data": user });
	 	});
});

//Employee Detail Page
router.get('/addemployee', function(req,res){
 	if((req.body.update)=='false'){
 		var employeeAddress = req.body.personalInfo.address;
 		addressDetail.addAddress(employeeAddress,function(err,user){
 			if(err){
 				res.json({ "code": 500, "status": err });
 			}
 			req.body.personalInfo.address = user.id;
 			generateUniqueId(employeeDetail,5,function(unique_Id){
 				if(unique_Id=="retry"){
				res.json({ "code": 500, "status": "retry" });
			}
			else{
				req.body.unique_Id = unique_Id;
				console.log(req.body);
				employeeDetail.addEmployee(req.body, function(err,user){
				if(err) 
				{
					res.json({ "code": 500, "status": err });
	
				}else{
					console.log("In offer111122");
	 				res.json({ "code": 200, "status": "success" });
				}
				});
			}

 			});
 		});
 	}else{
 		
 	}
 	});

//UniqueId Function
function generateUniqueId(model,size,callback){
	var uniqueId = utilities.stringGen(size);
	model.getByUniqueId(uniqueId, function(err,user){
		if(err){
			callback("retry");
		}else{
			if(user){
				generateUniqueId(model,size,callback);

			}else{
				callback(uniqueId);
		}
		}

	}); 
  
}


module.exports = router;