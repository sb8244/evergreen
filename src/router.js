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
	app.get('/', function() {
		var UserProvider = require("./models/user").UserProvider;
		var users = new UserProvider();
		users.findById("516cef0cddede7b843180de0", function(err, res) {
			console.log(res);
		})
	});
}