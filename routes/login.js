exports.index = function(req, res){
 	res.render('login', { title: 'Login', weje: 'weee', error: req.flash('error')[0] });
};