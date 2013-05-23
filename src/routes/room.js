var roomProvider = require("../models/room");

exports.index = function(req, res) {
	var roomID = req.params.id;
	roomProvider.getRoom(roomID, function(err, room) {
		console.log(room);
		if(err) throw err;
		res.render('room', {
			title: 'Room',
			room: room
		});
	});
}