var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	multer = require('multer'),
	methodOverride = require('method-override'),
	db = require('./config/db'),
	routes = require('./app/routes'),
	path = require('path'),
	mongoose = require('mongoose');


var port = process.env.PORT || 8010;

app.use(morgan('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.use(multer({ dest: path.join(__dirname,'public/upload/temp')}).single('file'));
//app.use(methodOverride('X-HTTP-Method-Override'));
app.use('/',express.static(path.join(__dirname,'./public')));

routes(app);

mongoose.connect(db.url);

mongoose.connection.on('open',function(){
	console.log('mongoose connected');
});

app.listen(port,function(){
	console.log('sever is listening on ' + port);
});

exports = module.exports = app;