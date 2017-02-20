var express = require('express');
var router = express.Router();
var newUser = require('../models/UserDetail.js');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('landingPage');
});
router.post('/register', function(req,res){
	var name = req.body.fullName;
	var emailId = req.body.emailId;
	var phoneNumber = req.body.phoneNumber;
	var password = req.body.password;

	//Validation
	req.checkBody('fullName', 'Name is required!').notEmpty();
	req.checkBody('emailId', 'Email is required!123').isEmail();
	req.checkBody('phoneNumber', 'phoneNumber is required!').notEmpty();
	req.checkBody('password', 'password is required!').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log(' Yes');
		res.render('landingPage',{
			errors: errors
		});
	}else{
		console.log(' No');

		

	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB. 
        password = hash;
        var newerUser = new newUser({
		fullName: req.body.fullName,
		emailId: req.body.emailId,
		password: password,
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
		console.log('User created!');
		req.flash('success_msg','u r registered and can login!!');
		res.redirect('/');
		
		});

    });
});
	
	}
	
});

passport.use(new LocalStrategy(
{
	usernameField: 'emailId',
	passwordField: 'password'

},
  function(username, password, done) {
    newUser.getUserByUserName(username, function(err, user){
    	if(err) {
    		console(err);
    	}
    	if(!user){
    		return done(null, false, {message: 'Unknown user!'});
    	}
    	newUser.comparePassword(password, user.password, function(err, isMatched){
    		console.log('wrong password user.password' + user.password);
    		if(err) {
    			console('123'+err);
    		}
    	if(isMatched){
    		return done(null, user);
    	}else{
    		console.log('wrong password');
    		return done(null, false, {message: 'password does not match'});
    	}

    	});
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  newUser.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',passport.authenticate('local'),
	function(req,res){

		var user = req.user.emailId;
		if(user == 'adminwhole@livebiking.in'){
			res.redirect('/admin');
		}
		else{
		res.redirect('/');
		}
});

module.exports = router;














