console.log("propertyController")
app.controller('propertyController', ['$scope', 'propertyFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams){
	
	// For dynamic form rendering: ADDRESSES
	$scope.addresses = [{id:'address1'}];

	$scope.addNewAddress = function(){
		var newAddressNo = $scope.addresses.length+1;
		$scope.addresses.push({id:'choice'+newAddressNo});
	};

	$scope.removeAddress = function(){
		var lastAddress = $scope.addresses.length-1;
		$scope.addresses.splice(lastAddress);
	};

	$scope.console = function(){
		console.log($scope.addresses)
		console.log(typeof($scope.newProp.phone));
	};

	// CRUD for properties
	$scope.createProp = function(){
		propertyFactory.createProp($scope.newProp, function(){
			$scope.newProp = {};
			$location.url('/properties')
		})
	}

}])