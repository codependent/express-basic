exports.dologout = function(req, res){
	console.log("logout!!!!!");
	req.logout();
	req.session.destroy(function (err) {
    	res.redirect('/'); //Inside a callback… bulletproof!
  	});
  	
};