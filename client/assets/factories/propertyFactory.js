app.factory('propertyFactory', ['$http', function($http){
	var factory = {};
	factory.createProp = function(property, callback){
		$http.post('/admin/prop', property).then(function(returnedData){
			callback()
		})
	}
	return factory;
}])