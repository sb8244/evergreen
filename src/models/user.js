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

exports.UserProvider = UserProvider;