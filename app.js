var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var priv = require('./routes/private');
var notes = require('./routes/notes');
var login = require('./routes/login');
var logout = require('./routes/logout');
var middlewares = require('./middlewares');
var passportCfg = require('./passport');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport')
var dbEngine = 'mongoose';
var dataCfg = require('./data/'+dbEngine+"-cfg");

var app = express();

//Init db
dataCfg.connect(function(error) {
	if (error) throw error;
});
app.on('close', function(errno) {
	console.log("cerrando app")
	dataCfg.disconnect(function(err) {console.log("error al desconectar de bbdd") });
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

passportCfg.config(passport);

middlewares.config(app, express, path, passport, flash);

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', login.index);
app.post('/login', passport.authenticate('local', 
	{ successRedirect: '/private',
		failureRedirect: '/login?loginError=-1',
		failureFlash: true }))
app.get('/logout', logout.dologout);                                                    
app.get('/private', priv.index);
app.get('/private/notes', notes.index(dataCfg));
app.get('/private/notes/add', notes.addForm(dataCfg));
app.post('/private/notes', notes.add(dataCfg));
app.get('/private/notes/edit', notes.editForm(dataCfg));
app.put('/private/notes', notes.edit(dataCfg));
app.delete('/private/notes/:id', notes.delete(dataCfg));

//REST Services
app.get('/private/services/notes', notes.index(dataCfg,true));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
