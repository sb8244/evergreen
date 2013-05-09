var Db = require("mongodb").Db;
var Connection = require("mongodb").Connection;
var Server = require("mongodb").Server;
var BSON = require("mongodb").BSON;
var ObjectID = require("mongodb").ObjectID;

var host = "localhost";
var port = 27017;

(function() {
	var dbToUse = "evergreen";
	if(global.testing === true)
		dbToUse = "evergreen_test";
	db = new Db(dbToUse, new Server(
		host, 
		port,
		{auto_reconnect: true},
		{}
	),
		{safe: true}
	);
	db.open(function(){});
})();

/*
 * Wrapper around new ObjectID to prevent extra imports and confusion
 */
exports.getObjectID = function(string, callback) {
	if(typeof string == 'ObjectID')
		callback(string);
	else
	{
		callback(new ObjectID(string));
	}
}

/*
 * Get a collection from Mongo
 */
exports.getCollection = function(collection, callback) {
	db.collection(collection, function(error, the_collection) {
		if ( error ) callback(error);
		else callback(null, the_collection);
	});
}
