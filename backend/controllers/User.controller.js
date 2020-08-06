const mongoose = require('mongoose');
const passport = require('passport');
const crypto = require("crypto");
const nodemailer = require('nodemailer'); 
const User = mongoose.model('User');
const EmailConfirmToken = require('../models/EmailConfirmToken');
const VerifiyToken = require('../models/Verification');

const Config = require('../config/config');
const validateLoginInput = require('../validation/login');

exports.login = async (req, res) =>  {  
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;
    // Find user by username
    User.findOne({ username }).then(user => {
        
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ usernamenotfound: 'User Name not found' });
        }

        //Check password is matched
        if(!user.validatePassword(password)) {
            return res
                .status(400)
                .json({passwordincorrect: 'Password incorrect'});
        }

        //Check account is active
        if(!user.accountActive){

            let email = user.email;

            var token = new EmailConfirmToken({
                email: email,
                token: crypto.randomBytes(16).toString("hex")
            });
            
            var resetUrl = `${Config.clientUrl}/confirm-email?token=`+token.token

            token.save(function(err) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    port: 25,
                    auth: {
                        user: Config.email,
                        pass: Config.password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })
                var mailOptions = {
                    from: 'apitestt26@gmail.com',
                    to: req.body.email,
                    subject: 'Email Confirm Link',
                    //You can use "html:" to send HTML email content. It's magic!
                    html: '<h3>Thanks for your choicing!</h3><br> <b>Please visit the following url</b><br>' + resetUrl,
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });              
            });
            return res.status(400).json({usernamenotverified: 'please check your email to confirm ! '});
        }

        let payload = {
            username: user.username,
            email: user.email,
            password: user.password,
            businessName: user.businessName,
            createdTime: user.createdTime
        }

        // Sign token
        jwt.sign(
            payload,
            Config.secretOrKey,
            {
                expiresIn: 86400 // 1 year in seconds
            },
            (err, token) => {
                res.json({
                    success: true,
                    token:token
                });
            }
        );

    })

};

exports.register = async (req, res) =>  {

    let user = await User.findOne({ username: req.body.username });
    if(user) {
        return res.status(400).json({ success: false, userExistsWithUsername: 'A user with this user name already exists.'});
    }
    
    user = await User.findOne({ email: req.body.email });
    if(user) {
        return res.status(400).json({ success: false, userExistsWithEmail: 'A user with this email address already exists.'});
    }

    let newUser = new User(req.body);
               
    var token = new EmailConfirmToken({
        email: req.body.email,
        token: crypto.randomBytes(16).toString("hex")
    });
    
    var resetUrl = Config.clientUrl + "/confirm-email?token="+token.token

    token.save(function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: Config.email,
                pass: Config.password
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        var mailOptions = {
            from: 'apitestt26@gmail.com',
            to: req.body.email,
            subject: 'Email Confirm Link',
            //You can use "html:" to send HTML email content. It's magic!
            html: '<h3>Thanks for your choicing!</h3><br> <b>Please visit the following url</b><br>' + resetUrl,
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });              
    });

    newUser
        .save()
        .then(res.json({ success: true, userCreated: true }))
        .catch(err => {
            res.status(400).json({success: false, unknownError: "Unknown errors occurred while new user registering."});
        });
};

exports.confirmEmail = async (req, res) =>  {
    var token = req.body.token;
    EmailConfirmToken.findOne({
        token: token
    })
        .then(verifyToken => {
            if (verifyToken) {
                User.findOne({
                    email: verifyToken.email
                })
                    .then(user => {
                        if (user) { 
                                var myquery = { email: user.email };
                                var newvalues = { $set: {accountActive: true} };
                                User.updateOne(myquery, newvalues) 
                                .then(us => {
                                    res.json({ status: user.email + ' updated!' })
                                })
                                .catch(err => {
                                    res.json({ error: "Wrong" })
                                });                          
                     
                        } else {
                            res.json({ error: "User does not exist" })
                        }
                    })
                    .catch(err => {
                        res.json({ error: "User does not exist" })
                    })
            } else {
                res.json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.json({ error: "User does not exist" })
        })
}

exports.sendConfirmEmail = async (req, res) =>  {
    var token = new EmailConfirmToken({
        email: req.body.email,
        token: crypto.randomBytes(16).toString("hex")
    });    
    var resetUrl = `${Config.clientUrl}/confirm-email?token=`+token.token
    token.save(function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: Config.email,
                pass: Config.password
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        var mailOptions = {
            from: 'apitestt26@gmail.com',
            to: req.body.email,
            subject: 'Email Confirm Link',
            //You can use "html:" to send HTML email content. It's magic!
            html: '<h3>Thanks for your choicing!</h3><br> <b>Please visit the following url</b><br>' + resetUrl,
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            return res.status(400).json({usernamenotverified: 'please check your email to confirm ! '});
            }
        });              
    });
}

exports.forgotPassword = async (req, res) =>  {  
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (user) {
            var token = new VerifiyToken({
                _userId: user._id,
                token: crypto.randomBytes(16).toString("hex")
            });
            
            var resetUrl = `${Config.clientUrl}/password-reset?token=`+token.token

            token.save(function(err) {
                if (err) {
                    return res.status(500).send(err.message);
                }

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    port: 25,
                    auth: {
                        user: Config.email,
                        pass: Config.password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })
                var mailOptions = {
                    from: 'apitestt26@gmail.com',
                    to: req.body.email,
                    subject: 'Email Confirm Link',
                    //You can use "html:" to send HTML email content. It's magic!
                    html: '<h3>Thanks for your choicing!</h3><br> <b>Please visit the following url</b><br>' + resetUrl,
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
                res.send(token)
            });
        } else {
            res.json({ error: "User does not exist" })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
}

exports.savePasswordWithVerify = async (req, res) =>  {  
    var token = req.body.token;
    //console.log(decoced._id);
    VerifiyToken.findOne({
        token: token
    })
    .then(verifyToken => {
        if (verifyToken) {
            User.findOne({
                _id: verifyToken._userId
            })
                .then(user => {
                    if (user) {
                        if(req.body.newPass != "") {
                            // bcrypt.hash(req.body.newPass, 10, (err, hash) => {
                                var myquery = { email: user.email };
                                var newvalues = { $set: {password: req.body.newPass} };
                                User.updateOne(myquery, newvalues) 
                                .then(us => {
                                    console.log(us)
                                    res.json({ status: user.email + ' updated!' })
                                })
                                .catch(err => {
                                    res.json({ error: "Wrong password" })
                                });
                            // })
                        } else {
                            res.json({ error: "Enpty passowrd" })
                        }
                    } else {
                        res.json({ error: "User does not exist" })
                    }
                })
                .catch(err => {
                    res.json({ error: "User does not exist" })
                })
        } else {
            res.json({ error: "User does not exist" })
        }
    })
    .catch(err => {
        res.json({ error: "User does not exist" })
    })
}
