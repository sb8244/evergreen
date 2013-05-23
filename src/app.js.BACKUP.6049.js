
/**
 * Module dependencies.
 */
var router = require("./router");
var express = require('express')
  , http = require('http')
  , path = require('path')
  , expressValidator = require('express-validator');

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
<<<<<<< HEAD
app.use(express.bodyParser({uploadDir:'./public/uploads'}));
=======
app.use(express.bodyParser());
app.use(expressValidator);
>>>>>>> df493a05bf172d91c142a9db951f08bcd17eb5a8
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

router.create(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});