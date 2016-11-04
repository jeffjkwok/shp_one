var mongoose = require('mongoose');
var Property = mongoose.model('Property');
function PropertyController(){
	this.createProp = function(req, res){
		var prop = new Property(req.body);
		prop.save(function(err, data){
			if(err){
				return res.json({prop: null})
			} else {
				return res.json({prop: data})
			}
		})
	}
	this.getProp = function(req, res){

	}
	this.updateProp = function(req, res){

	}
	this.deleteProp = function(req, res){

	}
};
module.exports = new PropertyController();