var root = __dirname;
var fs = require('fs-extra');

function ImageController(){
	this.imageUpload = function(req, res, next){
		var fstream;
	    req.pipe(req.busboy);
	    console.log(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) {
	        //Path where image will be uploaded
	        fstream = fs.createWriteStream(root + '/../../client/assets/images/' + filename);
	        file.pipe(fstream);
	        fstream.on('close', function () {    
	            console.log("Upload Finished of " + filename);              
	            res.redirect('/admin#/dashboard');           //where to go next
	        });
    	});
	};
};
module.exports = new ImageController();