var loginProvider = require("./login");

//Mock a session object
global.req = {};
global.req.session = {};

var id = "517e5d6cce44c18957648607";
/*
 * This login is invalid, should return false and not change the session
 */
exports.testInvalidLogin = function(test) {
	test.equal(req.session.user_id, undefined, "Session isn't empty");
	loginProvider.login("1","1", req, function(result) {
		test.equal(result, false, "Result should be false");
		test.equal(req.session.user_id, undefined, "Session should be empty");
		test.done();
	});
}

/*
 * This login is valid, should return true and set the user_id in the session
 */
exports.testValidLogin = function(test) {
	test.equal(req.session.user_id, undefined, "Session isn't empty");
	loginProvider.login("test@test.com","password", req, function(result) {
		test.equal(result, true, "Result should be true");
		test.equal(req.session.user_id, id, "Session should have the user_id");
		test.done();
	});
}

exports.testIsLoggedInPass = function(test) {
	//set the session so that the function returns true
	req.session.user_id = "23424234";
	loginProvider.isLoggedIn(req, function(result) {
		req.session.user_id = undefined;
		test.ok(result);
		test.done();
	});
}

exports.testIsLoggedInFalse = function(test) {
	//set the session so that the function returns true
	req.session.user_id = undefined;
	loginProvider.isLoggedIn(req, function(result) {
		test.equal(result, false);
		test.done();
	});
}