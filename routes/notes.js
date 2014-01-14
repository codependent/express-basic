exports.index = function(dataCfg,json){
	return function(req,res){
		dataCfg.Note.find({},function(err,notes){
			if (err) {
				util.log('ERROR ' + err);
				res.redirect('/error');
			} else {
				if(json){
					res.json(notes)
				}else{
					res.render('notes/notes', {	title: "Notes", notes: notes, mensaje: req.flash('mensaje')[0]} );
				}
			}
		});
	}
};

exports.addForm = function(dataCfg){
	return function(req,res){
		res.render('notes/addEdit', {
			title: "Notes add",
			note: dataCfg.emptyNote
		});
	}
};

exports.add = function(dataCfg){
	return function(req,res){
		var newNote = dataCfg.Note({author: req.body.author , note: req.body.note });
		newNote.save(function(err) {
			if (err) {
				util.log('FATAL '+ err);
				res.redirect('/error');
			}else{
				res.redirect('/private/notes');
			}
		});
	}
};

exports.editForm = function(dataCfg){
	return function(req,res){
		console.log("el id "+req.query.id)
		dataCfg.Note.findOne({ _id: req.query.id}, function(err, note) {
			if (err) {
				util.log('FATAL '+ err);
				res.redirect('/error');
			}else{
				console.log("la nota"+note)
				res.render('notes/addEdit', {
					title: "Notes edit",
					note: note
				});
			}	
		});
	}
};

exports.edit = function(dataCfg){
	return function(req,res){
		dataCfg.Note.findOne({ _id: req.body.id}, function(err, note) {
			if (err) {
				util.log('FATAL '+ err);
				res.redirect('/error');
			}else{
				console.log("la nota BBDD "+note)
				note.ts = new Date();
				note.author = req.body.author;
				note.note = req.body.note;
				note.save(function(err) {
					if (err) {
						util.log('FATAL '+ err);
						res.redirect('/error');
					}else{
						res.redirect('/private/notes');
					}
				});
			}	
		});
	}
};

exports.delete = function(dataCfg){
	return function(req,res){
		dataCfg.Note.findOne({_id:req.params.id},function(err, note) {
			if (err) {
				util.log('FATAL '+ err);
				res.redirect('/error');
			}else{
				note.remove();
				req.flash('mensaje', 'Nota eliminada')
				res.redirect('/private/notes');
			}
		});
	}
}