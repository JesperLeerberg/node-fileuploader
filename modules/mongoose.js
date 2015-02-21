
/*
--------------------------------------------------
|	Mongoose model
--------------------------------------------------
*/

var mongoose = require('mongoose'),
	config = require(root + '/config.js');

	mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

	var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

	var schema = new Schema({
		id   	: ObjectId,
		data	: String
	});

	var File = mongoose.model('File', schema)
/*
--------------------------------------------------
|	Module
--------------------------------------------------
*/

module.exports = {
	File: File,
	ObjectId: ObjectId
}


