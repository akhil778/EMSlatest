var path = require('path'),
	fs = require('fs'),
	md5 = require('MD5'),
	//Employee = require('../models/employee');
	EmployeeModel = require('../models/employee'); 

	module.exports = {
	index: function(req,res){
	console.log('in home controller');
	employees = [];
	EmployeeModel.find({},{},function(error,emps){
		if(error){throw error;}
		employees = emps;
		console.log('employees list');
		res.json(employees);	
	});
	},


	create : function(req,res){
		console.log('hello in create function');
		var saveEmployee=function(){
				var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
 					imgUrl = '';
				for(var i=0; i < 6; i+=1) {
 					imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
				}

				EmployeeModel.find({ filename: imgUrl }, function(err, employee) {
					if (employee.length> 0) {
 					// if a matching image was found, try again (start over):
					saveEmployee();
 				} else {
				// var tempPath = req.files.file.path, (This gave me an error)
					var tempPath = req.file.path,
						ext = path.extname(req.file.originalname).toLowerCase(),
 						targetPath = path.resolve('public/upload/' + imgUrl + ext);
 						console.log('ext : ' + ext);
 						console.log('tempPath is ' + tempPath);
 						console.log('targetPath is ' + targetPath);
					if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ==='.gif') {
 						fs.rename(tempPath, targetPath, function(err) {
 							if (err) throw err;	
 							//res.redirect('/images/' + imgUrl );
 							console.log('creating employee data');
 							var newEmployee = new EmployeeModel({
								id: req.body.id,
								name: req.body.name,
								designation:req.body.designation,
								email:req.body.email,
								filename: imgUrl + ext
							});
							newEmployee.save(function(err, employee) {
								console.log('Successfully inserted employee data: ' + employee.filename);
								res.json(employee);
								//res.redirect('/images/' + image.uniqueId);
 							});
						});
						} else {
 						fs.unlink(tempPath, function () {
 							if (err) throw err;
 							res.json(500, {error: 'Only image files are allowed.'});
 						});
					}
				}
 			});
		};
		saveEmployee();
	},

	remove: function(req,res){
		console.log('hello in remove function');
		console.log(req);
		EmployeeModel.findOne({id:req.params.id},function(err,employee){
			if(err){ throw err; }
			EmployeeModel.remove({id:req.params.id},function(err,employee){
				console.log('Employee removed ' + employee);
			});
			fs.unlink(path.resolve('public/upload/'+ employee.filename),
				function(err){
					if(err){throw err;}
					res.json(true);
				});
		});
	}

};

