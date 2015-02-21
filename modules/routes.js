
/*
--------------------------------------------------
|	Dependencies
--------------------------------------------------
*/

var mongoose = require(root + '/modules/mongoose');

/*
--------------------------------------------------
|	Routes module
--------------------------------------------------
*/

module.exports = {
	index: function(req, res) {
		res.send('Hello Jesper');
	},

	default: function(req, res) {
		res.redirect('/');
	},

	api: {
		getAll: function(req, res) {
			res.send("hello");
		},
		postOne: function(req, res) {
			var dataURL = req.body.dataURL;
			var file = new mongoose.File({
				data: dataURL
			});

			file.save(function(err) {
				if (err) throw err;
			})

		},
		getOne: function(req, res) {
			res.send("hello");
		},
		updateOne: function(req, res) {
			res.send("hello");
		},
		deleteOne: function(req, res) {
			res.send("hello");
		}
	}
}