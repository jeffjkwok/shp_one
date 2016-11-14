
app.factory ('userFactory', ['$http', function($http){
	var factory = {};
	factory.login = function(user, callback, callback2, callback3){
		$http.post('/admin/login', user).then(function(returnedData){
			if(returnedData.data.user == null){
				callback2();
			} else if(returnedData.data.user == "Arbritary Value"){
				callback3();
			} else {
				callback();
			}
		})
	}
	factory.checkUser = function(callback){
		$http.get('/admin/checkUser').then(function(returnedData){
			callback(returnedData.data)
		})
	}
	factory.createUser = function(user, callback){
		$http.post('/admin/user', user).then(function(returnedData){
			callback();
		})
	}
	factory.getUsers = function(callback){
		$http.get('/admin/getUsers').then(function(returnedData){
			callback(returnedData.data.users)
		})
	}

	factory.getUser = function(id, callback){
		$http.get('/admin/user/'+id).then(function(returnedData){
			callback(returnedData.data.user)
		})
	}

	factory.updateUser = function(id, user, callback){
		$http.put('/admin/user/'+id, user).then(function(returnedData){
			callback()
		})
	}

	factory.deleteUser = function(id, callback){
		$http.delete('/admin/user/'+id).then(function(returnedData){
			callback()
		})
	}
	return factory
}])