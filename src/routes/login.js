var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;
var loginProvider = require("../models/login");

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

exports.logout = function(req, res) {
	loginProvider.logout(req, function() {
		res.redirect("/login");
	});
}

exports.process = function (req, res) {
	form.handle(req, {
		success: function( form ) 
		{
			loginProvider.login(form.data['email'], form.data['password'], req, function(result) {
				if(result === false) {
					form.fields.email.error = "Oops, your credentials are not valid";
					res.render('login', {
						title: 'Login - Oops',
						error: true,
						form: form.toHTML()
					});
				} else {
					res.redirect("/rooms");
				}
			});
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
