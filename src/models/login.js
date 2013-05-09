var userProvider = require("./user");

exports.login = function(email, password, req, callback) {
	userProvider.checkLogin(email, password, function(error, result) {
		if(error || result === false) {
			callback(false);
		} else {
			req.session.user_id = result;
			callback(true);
		}
	});
}

exports.isLoggedIn = function(req, callback) {
	callback(req.session.user_id != undefined);
}