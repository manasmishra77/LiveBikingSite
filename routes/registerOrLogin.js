var express = require('express');
var router = express.Router();
var newUser = require('../models/UserDetail.js');
var session = require('express-session'),



/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('landingPage');
});
router.post('/', function(req,res){

	var newerUser = new newUser({
		fullName: req.body.fullName,
		emailId: req.body.emailId,
		password: req.body.password,
		phoneNumber: req.body.phoneNumber,
		referralCode: req.body.referralCode,
		updated_at: new Date(),
	});
	newerUser.save(function(err){
		if(err) 
		{
			if(err.code == 11000){
				console.log('User Exists!!');
			}
			else{
			console.log('Database Error!!');
				}
			return;
		}

		else{
		console.log('User created!');
		}

	});
	res.render('landingPage');
});

module.exports = router;