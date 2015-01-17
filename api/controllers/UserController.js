/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
module.exports = {
	createPeserta : function(req,res,next){
		var usrObj = {
			nama:req.param('nama'),
			email : req.param('email'),
			nim : req.param('nim'),
			kelas : req.param('kelas'),
			admin : false
		}
		User.create(usrObj, function userCreated(err,user){
			user.save(function(err,user){
				return res.redirect('/user/thankyou');
			});
		});
	},
	thankyou:function(req,res,next){
		res.view();
	},
	createAdmin : function(req,res,next){
		require('bcrypt').hash(req.param('password'), 10, function passwordEncrypted(err, encryptedPassword) {
		      if (err) return next(err);
		      var usrObj = {
		        username: req.param('username'),
		        encryptedPassword : encryptedPassword,
		        name: req.param('name'),
		        email: req.param('email'),
		        admin : true
		       }
		       User.create(usrObj, function userCreated(err,user){
			user.save(function(err,user){
				return res.redirect('/');
			});
		       });
		});
	},
	signin : function(req,res,next) {
		User.findOne({ or : [ {username : req.param('email')}, { email: req.param('email') } ] }, function foundUser(err, user) {
			if (err) return next(err);
			if(!user) {
				return res.redirect('/user/login');
			}	
			// Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);
				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					return res.redirect('/user/login');
				}
				req.session.authenticated = true;
				req.session.User = user;
				user.save(function(err, user) {
					if (err) return next(err);
					if (req.session.User.admin) {
						return res.redirect('/user');
					}
				});
			});
		});
	},
	sendemail : function(req,res,next) {
		User.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			res.view({
				user:user
			});
		});
	},
	send : function(req,res,next){
		User.findOne(req.param('id'),function foundUser(err,user){
			if(err) return next(err);
			var transporter = nodemailer.createTransport({
		              service:'Gmail',
		              auth:{
		                user:'mike.visualsoft@gmail.com',
		                pass:'michaellim493133'
		              }
		        	});
			 var MailOptions = {
		                from:'Michael Lim <mike.visualsoft@gmail.com>',
		                to : user.email,
		                subject : 'MPC',
		                html : req.param('isi')
		            };
		             transporter.sendMail(MailOptions,function(error,info){
		              if (error) {
		                console.log(error);
		              } else {
		                console.log('Message sent: '+info.response);
		              }
		        	});
		           return res.redirect('/user');
		});
	},
	login : function(req,res,next){
		res.view();
	},
	logout : function(req,res,next){
		req.session.destroy();
		return res.redirect('/');
	},
	index : function(req,res,next){
		User.find({'admin':false}, function foundUser(err,users){
			if(err) return next(err);
			res.view({
				users : users
			});
		});
	},
	list : function(req,res,next){
		User.find({'admin':false}, function foundUser(err,users){
			if(err) return next(err);
			res.view({
				users : users
			});
		});
	},
	destroy : function(req,res,next){
		User.findOne(req.param('id'), function foundUser(err,user){
			User.destroy(user.id, function UserDeleted(err){
				if(err) return next(err);
				return res.redirect('/user');
			});
		});
	}
};

