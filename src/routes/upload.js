//upload files to ../public/uploads/md5_timestamp
var fs = require('fs');
var path = require('path');
var roomProvider = require("../models/room");
exports.form = function( req, res ) {
	res.render('upload', {
		title: 'upload',
        room_id: req.params.room_id
	});
}
exports.upload = function(req, res) {
    var room_id = req.param("room_id");
    var user_id = req.session.user_id;

    var tmp_path = req.files.thumbnail.path;
    var target_path = '/uploads/';
    var crypto = require('crypto');
    var cryptName = crypto.createHash('md5').update(req.files.thumbnail.name + new Date().getTime()).digest("hex");
    target_path += cryptName + path.extname(req.files.thumbnail.name);

    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, "public" + target_path, function(err) {
        if (err) throw err;
        //room_id, name, type, content
        var name = req.files.thumbnail.name;
        var type = "image";
        var content = target_path;
        roomProvider.pushDocument(room_id, name, type, content, function(err, result) {
            if(err) throw err;
            res.redirect("/room/" + room_id + "/image");
        });
    });
}
