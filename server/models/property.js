var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PropertySchema = new Schema({
	propName: {type: String},
	manager: {type: String},
	district: {type: String},
	phone: {type: String},
	address: [{type: Schema.Types.Mixed}],
	city: {type: String},
	link: {type: String},
	description: {type: String}
}, {timestamps:true})
mongoose.model('Property', PropertySchema)