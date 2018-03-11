
/*
--------------------------------------------------
|	Dependencies
--------------------------------------------------
*/

global.root = __dirname;


var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	config = require(root + '/config.js'),
	routes = require(root + '/modules/routes.js')



/*
--------------------------------------------------
|	Server configuration
--------------------------------------------------
*/

var server = express();
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());
server.listen(config.port);


/*
--------------------------------------------------
|	Routes (get)
--------------------------------------------------
*/

server.get('/', routes.index);
server.get('*', routes.default);



/*
--------------------------------------------------
|	Routes API
--------------------------------------------------
*/


// Get all files
server.get('/api/files', routes.api.getAll);

// Upload new file
server.post('/api/files/', routes.api.postOne);

// Get one file
server.get('/api/files/:id', routes.api.getOne);

// Update one file
server.put('/api/files/:id', routes.api.updateOne);

// Delete file
server.delete('/api/files/:id', routes.api.deleteOne);
