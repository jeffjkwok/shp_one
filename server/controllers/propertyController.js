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
	this.updateProp = function(req, res){

	}
	this.deleteProp = function(req, res){
		Property.remove({_id: req.params.id}, function(err){
			if(err){
				console.log('Error with the deletion of Property')
			} else {
				return res.json({prop: null})
			}
		})
	}
	this.getProps = function(req,res){
		Property.find({}, function(err, props){
			if(err){
				console.log("Error Retrieving: ", err)
			} else {
				return res.json({props: props})
			}
		})
	}

	this.getProp = function(req, res){
		console.log('asdf')
		Property.findOne({_id: req.params.id}, function(err,prop){
			if(err){
				return res.json({prop: null})
			} else {
				return res.json({prop: prop})
			}
		})
	}

};
module.exports = new PropertyController();