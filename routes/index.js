var express = require('express');
var router = express.Router();
var newUser = require('../models/UserDetail.js');
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
var newOffers = require('../models/offers.js');
var utilities = require('../public/utilities/GeneralMethods.js');

//Configuration for email verification
nev.configure({
    verificationURL: 'http://livebiking.in/email-verification/${URL}',
    persistentUserModel: newUser,
    tempUserCollection: 'temp_NewUser',

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'verifynewuserlivebiking@gmail.com',
            pass:  '1234567890'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <verifynewuserlivebiking@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
});
// generating the model, pass the User model defined earlier
nev.generateTempUserModel(newUser);

router.get('/', fuction(req, res){
    res.render('landingPage');
});

//registration
router.post('/register', function(req,res){
    if(req.body){
        if (req.body.offer != ''){
            newOffers.getByUniqueId(req.body.offer, function(err, offer){
                if(err){
                    res.json({"code": 500, "status": "Error", "data": "Offer does not exist" + err});
                }else if(offer){
                    if(offer.offerName == "Referral"){
                        var newRegister = newUser({
                            fullName: req.body.fullName,
                            emailId: req.body.emailId,
                            password: req.body.password,
                            phoneNumber: req.body.phoneNumber,
                            offer: offer.id
                        });
                        nev.createTempUser(newRegister, function(err, existingPersistentUser, newTempUser){
                                // some sort of error
                                if(err){
                                    res.json({"code": 500, "status": "Error", "data": "Try Again!!" + err});
                                }
                                // user already exists in persistent collection...
                                if(existingPersistentUser){
                                    res.json({"code": 200, "status": "User Exists", "data": "Please Login or use forgot password!"});
                                }
                                //a new user
                                if(newTempUser){
                                    var URL = newTempUser[nev.options.URLFieldName];
                                    nev.sendVerificationEmail(email, URL, function(err, info){
                                        if(err){
                                            res.json({"code": 500, "status": "Error", "data": "Try Again!!" + err});
                                        }

                                    });
                                }// user already exists in temporary collection...
                                else{
                                    res.json({"code": 500, "status": "Confirmation already Sent", "data": "Kindly check inbox for verification!"});
                                }
                        });
                        
                    }else{
                        res.json({"code": 500, "status": "Error", "data": "Offer does not exist!!"});
                    }
                }else{
                    res.json({"code": 500, "status": "Error", "data": "Offer does not exist!!"});
                }
            });
        }else{
            var newRegister = newUser({
                            fullName: req.body.fullName,
                            emailId: req.body.emailId,
                            password: req.body.password,
                            phoneNumber: req.body.phoneNumber,
                            offer: offer.id
                        });
            nev.createTempUser(newRegister, function(err, existingPersistentUser, newTempUser){
                                // some sort of error
                                if(err){
                                    res.json({"code": 500, "status": "Error", "data": "Try Again!!" + err});
                                }
                                // user already exists in persistent collection...
                                if(existingPersistentUser){
                                    res.json({"code": 200, "status": "User Exists", "data": "Please Login or use forgot password!"});
                                }
                                //a new user
                                if(newTempUser){
                                    var URL = newTempUser[nev.options.URLFieldName];
                                    nev.sendVerificationEmail(email, URL, function(err, info){
                                        if(err){
                                            res.json({"code": 500, "status": "Error", "data": "Try Again!!" + err});
                                        }

                                    });
                                }// user already exists in temporary collection...
                                else{
                                    res.json({"code": 500, "status": "Confirmation already Sent", "data": "Kindly check inbox for verification!"});
                                }
                        });
        }



    }else{
        res.json({"code": 500, "status": "Error", "token": "Body is not there!!"});
    }
});
//Resend confirmation email
router.post('/resendconfirmation', function(req, res){
    nev.resendVerificationEmail(email, function(err, userFound) {
      if (err) {
        return res.status(404).send('ERROR: resending verification email FAILED');
      }
      if (userFound) {
        res.json({"code": 200, "status": "Confirmation already Sent", "data": "Kindly check inbox for verification!"})
      } else {
        res.json({"code": 500, "status": "Confirmation Expired", "data": "Kindly sign up again!!"})
              }
    });

});

//Callback after email verification
router.get('/email-verification/:URL', function(req,res){
    var url = req.params.URL;

  nev.confirmTempUser(url, function(err, user) {
    if (user) {
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
        res.redirect('/login');
      });
    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });

});


//authentication by login
router.post('/login', function(req, res){
        var userName = req.body.userName;
        var password = req.body.password;

        if (userName == "admin@livebiking.in"){
                if (password == "admin@678"){
                         var token = jwt.sign({data: userName}, 'superSecret', {
                                expiresIn: '96h' // expires in 96 hours
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



module.exports = router;














