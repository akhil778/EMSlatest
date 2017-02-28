var express = require('express'),
	router = express.Router(),
	other = require('./controllers/other'),
	home = require('./controllers/home');

module.exports = function(app){
	
	/*
	router.get('/', function(req, res) {
        res.sendFile('../public/index.html'); // load our public/index.html file
    });
	*/
	
	router.get('/employees', home.index);
	router.post('/employees', home.create);
	router.delete('/employees/:id', home.remove);
	//router.delete('/employees/'+ id ,home.remove);
	router.get('/ip',other.index);
	app.use(router);
};