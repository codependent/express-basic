
exports.index = function(req, res){
  res.render('private', { title: 'Private', user: req.user });
};

exports.sessionParam = function(req, res){
	req.session.key=req.params.val;
  	res.render('private', { title: 'Private' });
};