
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
	, store = new express.session.MemoryStore
  , path = require('path');

var fs = require('fs');

var app = express();

var dust = require('dustjs-linkedin')
, cons = require('consolidate');

app.engine('dust', cons.dust);

app.configure(function(){

  app.set('template_engine', 'dust');
  app.set('domain', 'localhost');
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('wigglybits'));
	app.use(express.session({ secret: 'whatever', store: store }));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));

	//middleware
	app.use(function(req, res, next){
		if ( req.session.user ) {
			req.session.logged_in = true;
		}
		res.locals.message = req.flash();
		res.locals.session = req.session;
		res.locals.q = req.body;
		res.locals.err = false; 
		next();
	});

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.locals.inspect = require('util').inspect;

//this rule render server side
app.get('/', routes.index);

//this rule is rendered both, client and server
app.get('/users', user.list);

//this rule is for pure render side
app.get('/client', function(request, response) {
  var data = fs.readFileSync('client.html');
  response.send(data.toString());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
