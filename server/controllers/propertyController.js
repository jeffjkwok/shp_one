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
		console.log(req.body, "hello")
		Property.update({_id: req.params.id}, {$set: req.body}, function(err){
			if(err){
				console.log("update error")
			} else {
				console.log("Property Updated")
				return res.json({prop: "Updated"})
			}
		})
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
		Property.findOne({_id: req.params.id}, function(err,prop){
			if(err){
				return res.json({prop: null})
			} else {
				return res.json({prop: prop})
			}
		})
	}

	// this.getDistrict = function(req, res){
	// 	Property.find({district: req.params.districtName}, function(err,props){
	// 		if(err){
	// 			console.log("Error Retrieving: ", err)
	// 		} else {
	// 			return res.json({props: props})
	// 		}
	// 	})
	// }

};
module.exports = new PropertyController();