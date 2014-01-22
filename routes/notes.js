var noteService = require('../services/notes');
var Note = require('../model/notes');

exports.index = function(json){
	return function(req,res){
		/* Implementación sin promesas Q
		Note.find({},function(err,notes){
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
		});*/
		noteService.find()
			.then(function(notes){
				console.log('success: ' + notes);
				if(json){
					res.json(notes)
				}else{
					res.render('notes/notes', {	title: "Notes", notes: notes, mensaje: req.flash('mensaje')[0]} );
				}
			})
			.fail(function(err){
				console.log('errror: ' + err);
				util.log('ERROR ' + err);
				res.redirect('/error');
			});
	}
}

exports.addForm = function(req,res){
	res.render('notes/addEdit', {
		title: "Notes add",
		note: {_id:null, author:"", note:""}
	});
}

exports.add = function(req,res){
	var newNote = new Note({author: req.body.author , note: req.body.note });
	newNote.save(function(err) {
		if (err) {
			util.log('FATAL '+ err);
			res.redirect('/error');
		}else{
			res.redirect('/private/notes');
		}
	});
}

exports.editForm = function(req,res){
	console.log("el id "+req.query.id)
	/*Sin promesas
	Note.findOne({ _id: req.query.id}, function(err, note) {
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
	*/
	noteService.findOne({ _id: req.query.id})
		.then(function(note) {
			console.log("la nota"+note)
			res.render('notes/addEdit', {
				title: "Notes edit",
				note: note
			});
		})
		.fail(function(err){
			util.log('FATAL '+ err);
			res.redirect('/error');
		});
}

exports.edit = function(req,res){
	/* Sin Q
	Note.findOne({ _id: req.body.id}, function(err, note) {
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
	});*/
	/* Con Q
	noteService.findOne({ _id: req.body.id})
		.then(function(note){
			console.log("la nota BBDD "+note);
			note.ts = new Date();
			note.author = req.body.author;
			note.note = req.body.note;
			noteService.update(note)
			.then(function(note){
				console.log("weee"+note)
				res.redirect('/private/notes');
			})
			.fail(function(err){
				console.log("weee2"+err)
				util.log('FATAL '+ err);
				res.redirect('/error');
			});
		})
		.fail(function(err){
			util.log('FATAL '+ err);
			res.redirect('/error');
		}
	);
	*/
	noteService.findOneAndUpdate({_id:req.body.id},{ts:new Date, author:req.body.author, note:req.body.note}, null)
	.then(function(note){
		res.redirect('/private/notes');
	})
	.fail(function(err){
		util.log('FATAL '+ err);
		res.redirect('/error');
	});
}

exports.delete = function(req,res){
	console.log("delete " + req.params.id);
	noteService.findOne({ _id: req.params.id})
		.then(function(note){
			try{
				console.log("delete1");
				note.remove();
				req.flash('mensaje', 'Nota eliminada')
				res.redirect('/private/notes');
			}catch(e){
				console.error(e);
			}
		})
		.fail(function(err){
			console.log("delete2");
			util.log('FATAL '+ err);
			res.redirect('/error');
		}
	);
}