var mongo = require("./mongo");

/*
 * Returns a single user by _id
 */
exports.findById = function(id, callback) {
	mongo.getCollection("users", function(err, col) {
		mongo.getObjectID(id,function(object_id) {
			col.find({_id: object_id}).toArray(function(error, res) {
				if(error) return callback(error);
				else if(res[0] == undefined) return callback({code: 1, error: "No such user"});
				else return callback(null, res[0]);
			});
		});
	});
}

/*
 * Returns the _id from Mongo if the email/password exists in the database.
 * Returns false if it does not exist
 */
exports.checkLogin = function(email, password, callback) {
	mongo.getCollection("users", function(err, col) {
		var crypto = require('crypto');
		var cryptPass = crypto.createHash('md5').update(password).digest("hex");

		//find user by email and MD5 password
		//If the user is found, return the user id, false otherwise
		col.find({email: email, password: cryptPass}).toArray(function(error, res) {
			if(error) return callback(error);
			else if(res[0] == undefined) return callback(null, false);
			else return callback(null, res[0]._id);
		});
	});
}

exports.registerUser = function(data, callback) {
	/* data should contain several properties:
	 	data.name
	 	data.email
	 	data.password
	 */

	 //Step 1: Get the users collection from mongo, you can see how to do this on lines 23
	mongo.getCollection("users", function(err, col) {
		if(err) return callback(err);
		else {
	 		//Step 2: Encrypt data.password using MD5. You can see how to do this on line 24-25
			var crypto = require('crypto');
			var cryptPass = crypto.createHash('md5').update(data.password).digest("hex");
	 		//Step 3: Using the examples provided in the schema, write the user's information to the database
			//Step 4: The database should have unique email addresses
			var params = {
				name:data.name,
				email:data.email,
				password:cryptPass,
				room_list:[]
			};
			col.save(params, function(err, result){
				if(err) return callback(err, null);
				else return callback(err, result);
			});
		}

	});
}
