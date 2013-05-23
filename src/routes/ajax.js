var roomProvider = require("../models/room");

exports.roomToolbarForm = function(req, res) {
	res.render('partials/rooms_toolbar_form');
};

exports.addRoom = function(req, res) {
	req.assert('title', 'The room\'s title can not be empty. Try again!').notEmpty();
	var errors = req.validationErrors();
	if(errors) {
		res.send(errors, 500);
		return;
	} else {
		var user_id = req.session.user_id;
		var title = req.param('title');
		var password = req.param('password');
		roomProvider.createRoom(title, password, function(err, result) {
			if(err) throw err;
			roomProvider.pushAuthorizedUserID(result._id, user_id, function(err) {
				if(err) throw err;
				res.render('partials/room_template', {
					room: result
				});
			});
		});
	}
}