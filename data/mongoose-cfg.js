var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dburl = 'mongodb://localhost:27017/app-basic';

var CommentSchema = new Schema({
	text : String,
	user : String,
	ts : { type: Date, default: Date.now}
});

var NoteSchema = new Schema({
	ts : { type: Date, default: Date.now},
	author : String,
	note : String,
	comments: [CommentSchema]
});

exports.Note = mongoose.model('Note', NoteSchema);
exports.emptyNote = { "_id": "", author: "", note: "" };

exports.connect = function(callback) {
	mongoose.connect(dburl);
}

exports.disconnect = function(callback) {
	mongoose.disconnect(callback);
}

/*
exports.forAll = function(doEach, done) {
	Note.find({}, function(err, docs) {
		if (err) {
			util.log('FATAL '+ err);
			done(err, null);
		}
		docs.forEach(function(doc) {
			doEach(null, doc);
		});
		done(null);
	});
}
*/