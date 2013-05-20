//https://github.com/caolan/forms
var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;

var form = forms.create({
	url: fields.url({required: true})
});

//look at login.js for example on how to do this
exports.index = function(req, res){
	res.render('url', {
                title: 'url',
                form: form.toHTML()
        });
}

exports.process = function(req, res) {
	res.send("okay", 200);
	return;
}
