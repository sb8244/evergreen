var roomProvider = require("../models/room");

exports.roomToolbarForm = function(req, res) {
	res.render('partials/rooms_toolbar_form');
};

exports.addRoom = function(req, res) {
	req.assert('title', 'The room\'s title can not be empty. Try again!').notEmpty();
	var errors = req.validationErrors();
	if(errors) {
		console.log(errors);
		res.send(errors, 500);
		return;
	} else {
		var user_id = req.session.user_id;
		if(user_id == null) {
			res.send([{msg: "You are not logged in. Please refresh and log in."}], 500);
		}
		var title = req.param('title');
		var password = req.param('password');
		roomProvider.createRoom(title, password, function(err, result) {
			if(err) throw err;
			roomProvider.pushAuthorizedUserID(result._id, user_id, function(err) {
				if(err) throw err;
				result.own = true;
				res.render('partials/room_template', {
					room: result
				});
			});
		});
	}
}

exports.removeRoom = function(req, res) {
	req.assert('room_id', 'invalid').notEmpty().isAlphanumeric();
	var errors = req.validationErrors();
	console.log(errors);
	if(errors) {
		res.send(errors, 500);
		return;
	} else {
		var user_id = req.session.user_id;
		var room_id = req.param("room_id");
		roomProvider.removeRoom(room_id, user_id, function(err, result) {
			if(err) throw err;
			console.log(result);
			if(result == 1) {
				res.send({status: "okay"}, 200);
			} else {
				res.send({status: "auth"}, 200);
			}
		});
	}
}