//upload files to ../public/uploads/md5_timestamp
var forms = require("forms");
var fields = forms.fields;
var fs = require('fs');
/*
 * Define the registration form fields here
 */
var form = forms.create({
});

exports.form = function( req, res ) {
	console.log("upload.form!");
	res.render('upload', {
		title: 'upload',
		form: form.toHTML()
	});
}
exports.upload = function(req, res) {
    var tmp_path = req.files.thumbnail.path;
    console.log('upload');
    var target_path = 'public/uploads/';
    var crypto = require('crypto');
    var cryptPass = crypto.createHash('md5').update(req.files.thumbnail.name).digest("hex");
    target_path += cryptPass + '_' + new Date().getTime();

    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
    fs.unlink(tmp_path, function() {
    if (err) throw err;
    res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });
}
