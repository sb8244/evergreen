var Mongo = require("./mongo").Mongo;

/*
 * Pass true during testing
 */
var UserProvider = function(useTestDB){
	mongo = new Mongo(useTestDB);
}

/*
 * Returns a single user by _id
 */
UserProvider.prototype.findById = function(id, callback) {
	mongo.getCollection("users", function(err, col) {
		mongo.getObjectID(id,function(object_id) {
			col.find({_id: object_id}).toArray(function(error, res) {
				if(error) callback(error);
				else if(res[0] == undefined) callback({code: 1, error: "No such user"});
				else callback(null, res[0]);
			});
		});
	});
}

/*
 * Returns the _id from Mongo if the email/password exists in the database.
 * Returns false if it does not exist
 */
UserProvider.prototype.checkLogin = function(email, password, callback) {
	mongo.getCollection("users", function(err, col) {
		var crypto = require('crypto');
		var cryptPass = crypto.createHash('md5').update(password).digest("hex");

		//find user by email and MD5 password
		//If the user is found, return the user id, false otherwise
		col.find({email: email, password: cryptPass}).toArray(function(error, res) {
			if(error) callback(error);
			else if(res[0] == undefined) callback(null, false);
			else callback(null, res[0]._id);
		});
	});
}

exports.UserProvider = UserProvider;