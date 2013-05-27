var register = require("./routes/register");
var login = require("./routes/login");
var room = require("./routes/room");
var rooms = require("./routes/rooms");
var ajax = require("./routes/ajax");
var documentform = require("./routes/documentform");
/*
 * All routes are defined in this file.
 *
 * They should be grouped according to the router used.
 */
exports.create = function( app ) {

	/*
	 * Index Routes
	 */
	app.get('/', function(req, res) { res.redirect("/login"); });

	app.all("/register", preventAuthenticated);
	app.get('/register', register.index);
	app.post('/register', register.process);

	app.all("/login", preventAuthenticated);
	app.get('/login', login.index);
	app.post('/login', login.process);

	app.get('/logout', login.logout);

	app.all('/room*', requireAuthentication);
	app.get('/rooms', rooms.index);

	app.get('/room/:id', room.index);
	
	app.get('/ajax/docuform', documentform.index);
	app.post('/ajax/docuform', documentform.process);

	app.get('/ajax/rooms/add', ajax.roomToolbarForm);
	app.post('/ajax/rooms/add', ajax.addRoom);
}

var loginProvider = require("./models/login");
var requireAuthentication = function(req,res,next) {
	loginProvider.isLoggedIn(req, function(result) {
	    if(result === true) {
	        next();
	    } else {
	       res.redirect("/login");
	    }
	});
}

var preventAuthenticated = function(req, res, next) {
	loginProvider.isLoggedIn(req, function(result) {
	    if(result === true) {
	    	res.redirect("/user/home");
	    } else {
	    	next();
	    }
	});
}
