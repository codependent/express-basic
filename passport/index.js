var LocalStrategy = require('passport-local').Strategy;

exports.config = function(passport){
	passport.use(new LocalStrategy(
		function(username, password, done) {
			if(username=='jose' && password == '123456'){
				done(null, username);
			}else{
				return done(null, false, { message: 'Usuario o password incorrecto' });
			}
	    /*User.findOne({ username: username }, function (err, user) {
	      if (err) { return done(err); }
	      if (!user) {
	        return done(null, false, { message: 'Incorrect username.' });
	      }
	      if (!user.validPassword(password)) {
	        return done(null, false, { message: 'Incorrect password.' });
	      }
	      return done(null, user);
	  });*/
	}
	));
		passport.serializeUser(function(user, done) {
			done(null, user);
		});
		passport.deserializeUser(function(id, done) {
	  /*User.findById(id, function(err, user) {
	    done(err, user);
	});*/
		done(null,id)
	});
}

