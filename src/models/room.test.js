var roomProvider = require("./room");
var mongo = require("./mongo");

exports.create = {
	createSuccessNoPassword: function(test) {
		var data = {
			name: "Test room",
			password: null
		}
		roomProvider.createRoom(data.name, data.password, function(err,result) {
			test.equals(err, null);
			test.equals(result.name, "Test room" );
			test.equals(result.password, null);
			test.notEqual(result.date, null);
			test.ok(arraysEqual(result.authorized_user_ids, []));
			test.ok(arraysEqual(result.documents, []));
			mongo.getCollection("rooms", function(err, col) {
				test.equals(err, null);
				col.remove({_id: result._id},function(err, result) {
					test.equals(err, null);
					test.done();
				});
			});
		});
	},
	createSuccessWithPassword: function(test) {
		var data = {
			name: "Test room",
			password: "password"
		}
		roomProvider.createRoom(data.name, data.password, function(err,result) {
			test.equals(err, null);
			test.equals(result.name, "Test room" );
			test.equals(result.password, "5f4dcc3b5aa765d61d8327deb882cf99");
			test.notEqual(result.date, null);
			test.ok(arraysEqual(result.authorized_user_ids, []));
			test.ok(arraysEqual(result.documents, []));
			mongo.getCollection("rooms", function(err, col) {
				test.equals(err, null);
				col.remove({_id: result._id},function(err, result) {
					test.equals(err, null);
					test.done();
				});
			});
		});
	}
}

exports.authorized_user_ids = {
	pushSingleSuccess: function(test) {		
		var data = {
			name: "Test room",
			password: null
		}
		roomProvider.createRoom(data.name, data.password, function(err,result) {
			test.equals(err, null);
			roomProvider.pushAuthorizedUserID(result._id, 1, function(err, auth_res) {
				test.equals(err, null);
				mongo.getCollection("rooms", function(err, col) {
					test.equals(err, null);
					col.find({_id: result._id}).toArray(function(err, result) {
						test.equals(result.length, 1);
						result = result[0];
						test.equals(err, null);
						test.ok(arraysEqual(result.authorized_user_ids, [1]));
						col.remove({_id: result._id}, function(err, result) {
							test.equals(err, null);
							test.done();
						});
					});
				});
			});
		});
	},

	pushDoubleSuccess: function(test) {		
		var data = {
			name: "Test room",
			password: null
		}
		roomProvider.createRoom(data.name, data.password, function(err,result) {
			test.equals(err, null);
			roomProvider.pushAuthorizedUserID(result._id, 1, function(err, auth_res) {
				test.equals(err, null);
				roomProvider.pushAuthorizedUserID(result._id, 2, function(err, auth_res) {
					test.equals(err, null);
					mongo.getCollection("rooms", function(err, col) {
						test.equals(err, null);
						col.find({_id: result._id}).toArray(function(err, result) {
							test.equals(result.length, 1);
							result = result[0];
							test.equals(err, null);
							test.ok(arraysEqual(result.authorized_user_ids, [1, 2]));
							col.remove({_id: result._id}, function(err, result) {
								test.equals(err, null);
								test.done();
							});
						});
					});
				});
			});
		});
	}
}

exports.document = {
	pushDocumentSuccess: function(test) {
		var roomdata = {
			name: "Test room",
			password: null
		}
		var data = {
			name: "Test document",
			type: "youtube",
			content: "http://www.youtube.com"
		}
		roomProvider.createRoom(roomdata.name, roomdata.password, function(err,result) {
			test.equals(err, null);
			roomProvider.pushDocument(result._id, data.name, data.type, data.content, function(err, push_res) {
				test.equals(err, null);
				mongo.getCollection("rooms", function(err, col) {
					test.equals(err, null);
					col.find({_id: result._id}).toArray(function(err, result) {
						test.equals(result.length, 1);
						test.equals(result[0].documents.length, 1);
						test.equals(result[0].documents[0].name, data.name);
						test.equals(result[0].documents[0].type, data.type);
						test.equals(result[0].documents[0].content, data.content);
						test.equals(result[0].documents[0].likes, 0);
						test.equals(result[0].documents[0].dislikes, 0);
						test.equals(result[0].documents[0].report_count, 0);
						test.ok(arraysEqual(result[0].documents[0].comments, []));
						test.notEqual(result[0].documents[0].date, null);
						col.remove({_id: result[0]._id}, function(err, result) {
							test.equals(err, null);
							test.done();
						});
					});
				});
				
			});
		});
	}
}

exports.find = {
	publicFindNone: function(test) {
		roomProvider.listPublicRooms(function(err, result) {
			test.equals(err, null);
			test.equals(result.length, 0);
			test.done();
		});
	},
	publicFindSingle: function(test) {
		var roomdata = {
			name: "Test room",
			password: null
		}
		roomProvider.createRoom(roomdata.name, roomdata.password, function(err,result) {
			test.equals(err, null);
			roomProvider.listPublicRooms(function(err, result) {
				test.equals(err, null);
				test.equals(result.length, 1);
				test.equals(result[0].name, "Test room");
				mongo.getCollection("rooms", function(err, col) {
					col.remove({name: roomdata.name}, function(err, result) {
						test.equals(err, null);
						test.done();
					});
				});
			});
		});
	},
	publicFindMultiple: function(test) {
		var roomdata = {
			name: "Test room",
			password: null
		}
		roomProvider.createRoom(roomdata.name, roomdata.password, function(err,result) {
			test.equals(err, null);
			roomProvider.createRoom(roomdata.name, roomdata.password, function(err,result) {
				test.equals(err, null);
				roomProvider.listPublicRooms(function(err, result) {
					test.equals(err, null);
					test.equals(result.length, 2);
					test.equals(result[0].name, "Test room");
					test.equals(result[1].name, "Test room");
					test.notEqual(result[0]._id, result[1]._id);
					mongo.getCollection("rooms", function(err, col) {
						col.remove({name: roomdata.name}, function(err, result) {
							test.equals(err, null);
							test.done();
						});
					});
				});
			});
		});
	}
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