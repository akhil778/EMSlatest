var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	path = require('path');

var EmployeeSchema = new Schema({
	id : {type:Number},
	name : {type:String},
	designation : {type:String},
	email: {type:String},
	filename: {type : String}
});


module.exports = mongoose.model('Employee', EmployeeSchema);
