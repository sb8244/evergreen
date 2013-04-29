var UserProvider = require("./user").UserProvider;

var id = "517e5d6cce44c18957648607";
exports.getUser = {

	/*
	 * Test the finding a user by _id works
	 *
	 * Assert all of the known information returns correctly
	 */
	testGetUserByIDGood: function(test) {
		test.expect(7);
		var users = new UserProvider(true);
		users.findById(id, function(err, result) {
			test.equal(err, null);
			test.notEqual(result, null);
			test.equal(id, result._id);
			test.equal(result.name, "Tester");
			test.equal(result.email, "test@test.com");
			test.equal(result.password, "5f4dcc3b5aa765d61d8327deb882cf99");
			test.ok(arraysEqual(result.room_list, []));
			test.done();
		});
	},

	/*
	 * Test finding a user which doesn't exist
	 *
	 * Error "No such user" is returned with error code 1
	 */
	testGetUserByIDBad: function(test) {
		test.expect(4);
		var users = new UserProvider(true);
		var badID = "016cfa412bad24810c0f8349";
		users.findById(badID, function(err, result) {
			test.notEqual(err, null);
			test.equal(err.error, "No such user");
			test.equal(err.code, 1);
			test.equal(result, null);
			test.done();
		})
	}
}

exports.checkLogin = {
	/*
	 * Login is bad, should return false
	 */
	testCheckLoginBad: function(test) {
		test.expect(2);
		var users = new UserProvider(true);
		var badEmail = "doesnotexist";
		var badPassword = "doesntmatter";
		users.checkLogin(badEmail, badPassword, function(error, result) {
			test.equal(error, null);
			test.equal(result, false);
			test.done();
		});
	},
	/*
	 * Login is good, should return the _id and not false
	 */ 
	testCheckLoginGood: function(test) {
		test.expect(3);
		var users = new UserProvider(true);
		var goodEmail = "test@test.com";
		var goodPassword = "password";
		users.checkLogin(goodEmail, goodPassword, function(error, result) {
			test.equal(error, null);
			test.notEqual(result, false);
			test.equal(result, id);
			test.done();
		});
	},
}

/*
 * Helper function for array equality
 */
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}