var roomProvider = require("../models/room");

exports.index = function(req, res) {
	var roomID = req.params.id;
	var uploadType = req.params.upload;
	console.log(uploadType);
	roomProvider.getRoom(roomID, function(err, room) {
		console.log(room);
		if(err) throw err;
		res.render('room', {
			title: 'Room',
			room: room,
			room_toolbar: true,
			uploadType: uploadType
		});
	});
}