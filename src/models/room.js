var mongo = require("./mongo");

exports.createRoom = function(data, callback) {
	/*
	 * data {
		name,
		?password?
	 }
	 */
	 var date = new Date();
	 mongo.getCollection("rooms", function(err, col) {

	 	if(data.password) {
			var crypto = require('crypto');
			var cryptPass = crypto.createHash('md5').update(data.password).digest("hex");
		} else {
			var cryptPass = null;
		}
	 	var params = {
	 		name: data.name,
	 		password: cryptPass,
	 		date: date,
	 		authorized_user_ids: [],
	 		documents: []
	 	};
	 	col.save(params, function(err, result) {
	 		if(err) return callback(err, null);
	 		return callback(null, result);
	 	});
	 });

}

exports.pushAuthorizedUserID = function(id, user_id, callback) {
	 mongo.getCollection("rooms", function(err, col) {
		mongo.getObjectID(id, function(object_id) {
		 	col.update({_id: object_id}, {$push: {authorized_user_ids: user_id}}, function(err, result) {
		 		if(err) return callback(err, null);
		 		return callback(null, result);
		 	});
		 });
	 });	
}