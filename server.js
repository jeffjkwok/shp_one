var express = require('express'),
	app = express(),
	bp = require('body-parser'),
	path = require('path'),
	root = __dirname,
	port = process.env.PORT || 8000,
	session = require('express-session'),
	busboy = require('connect-busboy'),
	fs = require('fs-extra');


app.set('trust proxy', 1)
app.use(session({
	secret: 'grumpy cat',
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false}
}))

app.use(busboy());

app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
app.use(express.static(path.join(root, 'node_modules')));
app.use(bp.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function(){
	console.log(`Server is running on ${port}`)
})
