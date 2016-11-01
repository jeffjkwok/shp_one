var path = require('path');
var root = __dirname;
var user = require('../controllers/userController.js');

module.exports = function(app){
	app.get('/admin/', function(req,res){
		res.sendFile(path.join(root, '../../client', 'admin.html'));
	})
	app.post('/admin/login', user.login);
	app.get('/logout', user.logout);
	app.get('/admin/checkUser', user.checkUser);
	app.get('/admin/getUsers', user.getUsers);
	app.post('/admin/user', user.createUser);
	app.get('/admin/user/:id', user.getUser);
	app.put('/admin/user/:id', user.updateUser);
	app.delete('/admin/user/:id', user.deleteUser);
}