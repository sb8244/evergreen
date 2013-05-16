var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;

/*
 * Define the registration form fields here
 */
var form = forms.create({
	email: fields.email({required: true}),
	password: fields.password({required: true}),
});

exports.index = function( req, res ) {
	res.render('login', {
		title: 'Login',
		form: form.toHTML()
	});
}

exports.process = function (req, res) {
	form.handle(req, {
		success: function( form ) 
		{
			var loginProvider = require("../models/login");
			
		},
		other: function( form )
		{
			//An error happened, render the form
			res.render('login', {
				title: 'Login - Oops',
				error: true,
				form: form.toHTML()
			});
		}
	});
}