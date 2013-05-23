var register = require("./routes/register");
var login = require("./routes/login");
var home = require("./routes/home");
var documentform = require("./routes/documentform");
var upload = require("./routes/upload");
/*
 * All routes are defined in this file.
 *
 * They should be grouped according to the router used.
 */
exports.create = function( app ) {

	/*
	 * Index Routes
	 */
	//app.get('/', index.index);
	app.all("/register", preventAuthenticated);
	app.get('/register', register.index);
	app.post('/register', register.process);

	app.all("/login", preventAuthenticated);
	app.get('/login', login.index);
	app.post('/login', login.process);

	app.get('/logout', login.logout);

	app.all('/user/*', requireAuthentication);
	app.get('/user/home', home.index);
	
	app.get('/ajax/docuform', documentform.index);
	app.post('/ajax/docuform', documentform.process);

	app.get('/upload', upload.form);
	app.post('/upload', upload.upload);
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
