var express = require('express');
var router = express.Router();
var newBikeModel = require('../models/BikeMakeModel.js');

//admin page
router.get('/', function(req,res){
	res.render('dashboard-admin');	
});

//bike make and model page
router.get('/addbike', function(req,res){
 newBikeModel.getListOfBikes(function(err, user){
 	console.log('user');
	res.render('addbikemakemodel', {bikelist: user});
	});
	
});

module.exports = router;