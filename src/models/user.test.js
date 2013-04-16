var UserProvider = require("./user").UserProvider;

/*
 * Test the finding a user by _id works
 *
 * Assert all of the known information returns correctly
 */
exports.testGetUserByIDGood = function(test) {
	test.expect(7);
	var users = new UserProvider(true);
	var id = "516cfa412bad24810c0f8349";
	users.findById(id, function(err, result) {
		test.equal(err, null);
		test.notEqual(result, null);
		test.equal(id, result._id);
		test.equal(result.name, "Stephen Bussey");
		test.equal(result.email, "sb8244@cs.ship.edu");
		test.equal(result.password, "5f4dcc3b5aa765d61d8327deb882cf99");
		test.ok(arraysEqual(result.room_list, []));
		test.done();
	});
}

/*
 * Test finding a user which doesn't exist
 *
 * Error "No such user" is returned with error code 1
 */
exports.testGetUserByIDBad = function(test) {
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