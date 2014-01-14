var authMid = require('./authorization');

exports.config = function(app,express,path,passport,flash){
	app.use(express.static(path.join(__dirname+"/..", 'public')));
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	//authorization filter
	app.use('/private', authMid.check);
	app.use(app.router);

	app.use(notFoundHandler);
	// development only
	/*if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}*/
	app.use(logErrors);
	app.use(ajaxErrorHandler);
	app.use(errorHandler);

}

function notFoundHandler(req, res, next){
	res.status(404);
  	// respond with html page
  	if (req.accepts('html')) {
  		res.render('error', { title:"Error", error: '404 Página no encontrada' });
  		return;
  	}
  	// respond with json
  	if (req.accepts('json')) {
 	 	res.send({ error: 'Not found' });
  		return;
  	}
  	// default to plain-text. send()
  	res.type('txt').send('Not found');
}	

function logErrors(err, req, res, next) {
	console.error("ERROR! "+err.stack);
	next(err);
}

function ajaxErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.send(500, { error: 'Something blew up!' });
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', { title:"Error", error: err });
}