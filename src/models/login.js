var userProvider = require("./user");

exports.login = function(email, password, req, callback) {
	userProvider.checkLogin(email, password, function(error, result) {
		if(error || result === false) {
			return callback(false);
		}
		req.session.user_id = result;
		return callback(true);
	});
}

exports.isLoggedIn = function(req, callback) {
	return callback(req.session.user_id != undefined);
}