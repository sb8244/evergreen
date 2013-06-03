//upload files to ../public/uploads/md5_timestamp
var fs = require('fs');
var path = require('path');

exports.form = function( req, res ) {
	res.render('upload', {
		title: 'upload'
	});
}
exports.upload = function(req, res) {
    var tmp_path = req.files.thumbnail.path;
    var target_path = 'public/uploads/';
    var crypto = require('crypto');
    var cryptName = crypto.createHash('md5').update(req.files.thumbnail.name + new Date().getTime()).digest("hex");
    target_path += cryptName + path.extname(req.files.thumbnail.name);

    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send({path: target_path}, 200);
        });
    });
}
