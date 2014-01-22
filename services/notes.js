var Note = require('../model/notes');
var Q = require('q');

exports.find = Q.nfbind(Note.find.bind(Note));
exports.findOne = Q.nfbind(Note.findOne.bind(Note));
exports.findOneAndUpdate = Q.nfbind(Note.findOneAndUpdate.bind(Note));
exports.delete = Q.nfbind(Note.remove.bind(Note));

exports.save = function(props){
	console.log("save()");
	var deferred = Q.defer();
	var note = new Note(props);
	note.save(function(err, saved) {
		console.log("save() - saving()");
		if (err) {
			deferred.reject(err);
		}else{
			deferred.resolve(saved);
		}
	});	
	console.log("save() - exit()");
	return deferred.promise;
}

exports.update = function(note){
	console.log("save()");
	var deferred = Q.defer();
	note.save(function(err, saved) {
		console.log("save() - saving()");
		if (err) {
			deferred.reject(err);
		}else{
			deferred.resolve(saved);
		}
	});	
	console.log("save() - exit()");
	return deferred.promise;
}