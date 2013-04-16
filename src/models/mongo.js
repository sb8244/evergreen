var Db = require("mongodb").Db;
var Connection = require("mongodb").Connection;
var Server = require("mongodb").Server;
var BSON = require("mongodb").BSON;
var ObjectID = require("mongodb").ObjectID;

var host = "localhost";
var port = 27017;

var Mongo = function(useTestDB) {
	var dbToUse = "evergreen";
	if(useTestDB === true)
		dbToUse = "evergreen_test";
	this.db = new Db(dbToUse, new Server(
		host, 
		port,
		{auto_reconnect: true},
		{}
	),
		{safe: true}
	);
	this.db.open(function(){});
}

/*
 * Wrapper around new ObjectID to prevent extra imports and confusion
 */
Mongo.prototype.getObjectID = function(string, callback) {
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
Mongo.prototype.getCollection = function(collection, callback) {
	this.db.collection(collection, function(error, the_collection) {
		if ( error ) callback(error);
		else callback(null, the_collection);
	});
}

exports.Mongo = Mongo;