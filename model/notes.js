var Q = require('q');
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Note', NoteSchema);