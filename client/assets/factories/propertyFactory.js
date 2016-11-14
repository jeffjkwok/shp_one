app.factory('propFactory', ['$http', function($http){
	var factory = {};
	factory.createProp = function(property, callback){
		$http.post('/admin/prop', property).then(function(returnedData){
			callback()
		})
	}
	factory.getProps = function(callback){
		$http.get('/admin/getProps').then(function(returnedData){
			callback(returnedData.data.props)
		})
	}

	factory.deleteProp = function(id, callback){
		$http.delete('/admin/prop/'+id).then(function(returnedData){
			callback();
		})
	}

	factory.getProp = function(id, callback){
		$http.get('/admin/prop/'+id).then(function(returnedData){
			callback(returnedData.data.prop)
		})
	}

	factory.updateProp = function(id, prop, callback){
		$http.put('/admin/prop/'+id, prop).then(function(returnedData){
			callback()
		})
	}

	factory.getDistrict = function(callback){
		$http.get('/district/').then(function(returnedData){
			callback(returnedData.data.props);
		})
	}

	return factory;
}])