var register = require("./routes/register");
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
	app.get('/register', register.index);
	app.post('/register', register.process);
}