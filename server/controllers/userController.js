var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
function userController(){
	// Login Function
	// // Checks if Users, then matches password.
	// // Do we want two separate errors to tell them whats wrong??
	this.login = function(req, res){
		User.findOne({username: req.body.username}, function(err, user){
			if(user){
				console.log(user.username, 'exists, logging in')
				var result = bcrypt.compareSync(req.body.password, user.password)
				if(result){
					req.session.user = user;
					req.session.save();
					return res.json({user: "user"})
				} else {
					console.log('but password does not match')
					return res.json({user: 300})
				}
			} else {
				console.log('User does not exist')
				return res.json({user: null})
			}
		})
	}
	// Logout Function
	this.logout = function(req, res){
		console.log(req.session.user, 'is logging out')
		req.session.destroy();
		res.redirect('/admin');
	}
	// Checks if User is in session throughout the Admin part of the website.
	this.checkUser = function(req, res){
		if(req.session.user){
			res.json({user:req.session.user})
		} else {
			res.json({user: null})
		}
	}
	// This function creates Users on the "Manage Users" portion of the Admin Dash
	this.createUser = function(req,res){
		req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
		console.log(req.body.password, 'password')
		var user = new User(req.body);
		user.save(function(err,data){
			if(err){
				console.log('Error: ',err)
				return res.json({user: null})
			}else {
				return res.json({user: data})
			}
		})
	}
	// Retrieve Users for table 
	this.getUsers = function(req,res){
		User.find({}, function(err, users){
			if(err){
				console.log("Error Retrieving: ", err)
				return res.json({users: null})
			} else {
				// when pulling down from git, the initial log in info will be 
				// username: admin
				// password: root
				if (users.length < 1) {
					var password = "root"
					var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
					var defaultUser = new User({username: "admin", password: hash})
					defaultUser.save()
				}
				console.log('Retrieving Users')
				return res.json({users: users})
			}
		})
	}
	this.getUser = function(req,res){
		User.findOne({_id: req.params.id}, function(err,user){
			if(err){
				console.log("Error getting user: ", err);
				return res.json({ user:null})
			} else {
				return res.json({user:user})
			}
		})
	}
	this.updateUser = function(req, res){
		User.update({_id: req.params.id}, function(err){
		})
	}

	this.deleteUser = function(req, res){
		User.remove({_id: req.params.id}, function(err){
			if(err){
				console.log("there was an error with the delete")
			} else {
				return res.json({ user: null})
			}
		})
	}
}
module.exports = new userController()