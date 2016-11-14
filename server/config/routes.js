var path = require('path');
var root = __dirname;
var user = require('../controllers/userController.js');
var prop = require('../controllers/propertyController.js');
var image = require('../controllers/imageController.js');

module.exports = function(app){
	// ROUTES FOR ADMIN
	app.get('/admin/', function(req,res){
		res.sendFile(path.join(root, '../../client', 'admin.html'));
	}),
	app.post('/admin/login', user.login);
	app.get('/logout', user.logout);
	app.get('/admin/checkUser', user.checkUser);
	app.get('/admin/getUsers', user.getUsers);
	app.post('/admin/user', user.createUser);
	app.get('/admin/user/:id', user.getUser);
	app.put('/admin/user/:id', user.updateUser);
	app.delete('/admin/user/:id', user.deleteUser);

	// ROUTE FOR IMAGE UPLOAD
	app.post('/upload', image.imageUpload);

	// // ROUTES FOR PROPERTY
	app.get('/admin/getProps', prop.getProps)
	app.post('/admin/prop', prop.createProp);
	app.get('/admin/prop/:id', prop.getProp);
	app.put('/admin/prop/:id', prop.updateProp);
	app.delete('/admin/prop/:id', prop.deleteProp);
}