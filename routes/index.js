var express = require('express');
var router = express.Router();
var newUser = require('../models/UserDetail.js');
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
var newOffers = require('../models/offers.js');
var utilities = require('../public/utilities/GeneralMethods.js');
var jwt    = require('jsonwebtoken');
var nodemailer = require('nodemailer');


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
nev.generateTempUserModel(newUser, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }
});

router.get('/', function(req, res){
    var token = req.body.token || req.query.token || req.headers['x-acess-token'];
    if(token){
        jwt.verify(token, 'UserSecret', function(err, decoded){
        if(err){
            return res.render('landingPage');
        }else{
            req.decoded = decoded;
            var id = decoded.payload.id;
            newUser.getUserById(id, function(err, user){
                if(err){
                    return res.render('landingPage');
                }
                if(user){
                    res.render('landingPage', { user: 'user'});
                }else{
                    return res.render('landingPage');                
                }
            });
        }
    });
    }else{
        return res.render('landingPage');
    }
    
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
        res.json({"code": 302, "status": "Confirmation Expired", "data": "Kindly sign up again!!"})
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


//authentication token by login
router.post('/login', function(req, res){
        var userName = req.body.userName;
        var password = req.body.password;
        if(userName){
            newUser.getUserByUserName(userName,function(err,user){
                if(err){
                    return res.status(404).send('ERROR: confirming temp user FAILED');
                }
                if(user){
                    if(password == user.password){
                        //Provide access token
                         var token = jwt.sign({emailId: userName, id: user.id}, 'UserSecret', {
                            expiresIn: '96h' // expires in 24 hours
                        });
                         res.json({"code": 200, "status": "success", "token": token});
                    }else{
                        res.json({"code": 200, "status": "wrong password", "data": "Wrong password"});
                    }
                }else{
                        res.json({"code": 302, "status": "User not found", "data": "User not found!!"});
                    }
            });
            }else{
                        res.json({"code": 302, "status": "Enter emailId", "data": "emailId field is blank"});
                    }
      });
router.post('/forgot', function(req,res){
    var userName = req.body.userName;
    var resetPassword = utilities.stringGen(size);
if(userName){
    newUser.getUserByUserName(userName, function(err,user){
        if(err){
                    return res.status(404).send('ERROR: search failed'+ err);
                }
                if(user){
                    
                    user.password = resetPassword;
                    newUser.updateUser(user.id, user, function(err, data){
                        if(err){
                            return res.status(404).send('ERROR: update failed'+ err);
                        }
                        let transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                        user: 'verifynewuserlivebiking@gmail.com',
                                        pass: '1234567890'
                                        }
                    });
                    let mailOptions = {
                            from: 'Do Not Reply <verifynewuserlivebiking@gmail.com>', // sender address
                            to: userName, // list of receivers
                            subject: 'Forgot Password', // Subject line
                            text: 'Your new password is    '+ resetPassword, // plain text body

                    };
                    res.json({"code": 200, "status": "New password sent!!", "data": "New password sent!! Please check your mail "+userName });
                    });
                }else{
                        res.json({"code": 200, "status": "User Not found", "data": "User not found!!"});
                    }
    });
}
});






module.exports = router;














