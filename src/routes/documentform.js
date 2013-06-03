//https://github.com/caolan/forms
var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;
var webshot = require('webshot');
var roomProvider = require("../models/room");
var form = forms.create({
	url: fields.url({required: true})
});

//look at login.js for example on how to do this
exports.index = function(req, res){
	var room_id = req.params.room_id;
	res.render('url', {
                title: 'url',
                form: form.toHTML(),
                room_id: room_id
        });
}

exports.process = function(req, res) {
	form.handle(req, {
		success: function( form ) 
		{
			var url = form.fields.url.value;
			var room_id = req.param("room_id");
			var path = '/images/' + url + ".png";
			webshot(url, "public" + path, function(err) {
				if(err) throw err;
				var name = url;
		        var type = "website";
		        var content = path;
		        roomProvider.pushDocument(room_id, name, type, content, function(err, result) {
		            if(err) throw err;
		            res.redirect("/room/" + room_id + "/image");
		        });
			});
		},
		other: function( form )
		{
			res.send(500);
		}
	});
}
