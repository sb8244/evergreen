var register = require("./routes/register");
var login = require("./routes/login");
var home = require("./routes/home");
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

	app.all('/user/*', requireAuthentication);
	app.get('/user/home', home.index);

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