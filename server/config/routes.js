var path = require('path');
var root = __dirname;
var user = require('../controllers/userController.js');
var fs = require('fs-extra');

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

	// upload route
	app.post('/upload', function(req, res, next) {
		var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/../../client/assets/images/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('/admin#/dashboard');           //where to go next
            });
        });
	});
}