var roomProvider = require("../models/room");
var async = require("async");
exports.index = function(req, res) {
	var user_id = req.session.user_id;
	async.parallel([
		function(callback) {
			roomProvider.listPublicRooms(function(err, rooms) {
				if(err) return callback(err, null);
				async.each(rooms, function(item, callback) {
					if(item.authorized_user_ids.indexOf(user_id) >= 0) {
						item.own = true;
					} else {
						item.own = false;
					}
					return callback(null, item);
				}, function(err) {
					if(err) return callback(err, null);
					console.log(rooms);
					return callback(null, rooms);
				});
			});
		},
		function(callback) {
			roomProvider.listPrivateRoomsForUser(user_id, function(err, rooms) {
				if(err) return callback(err, null);
				return callback(null, rooms);
			});
		}
	],
	function(err, results) {
		if(err) throw err;
		res.render('rooms', {
			title: 'Home',
			rooms: results[0],
			privaterooms: results[1],
			rooms_toolbar: true
		});
	});
}
