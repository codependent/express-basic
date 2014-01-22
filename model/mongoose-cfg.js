var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/app-basic';

exports.connect = function(callback) {
	mongoose.connect(dburl);
}
exports.disconnect = function(callback) {
	mongoose.disconnect(callback);
}