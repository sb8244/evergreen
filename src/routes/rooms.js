var roomProvider = require("../models/room");

exports.index = function(req, res) {
	roomProvider.listPublicRooms(function(err, rooms) {
		console.log(rooms);
		if(err) throw err;
		res.render('rooms', {
			title: 'Home',
			rooms: rooms
		});
	});
}
