app.controller('propertyController', ['$scope', 'propFactory', '$location', '$routeParams', function($scope, propFactory, $location, $routeParams){
	
	// For dynamic form rendering: ADDRESSES
	$scope.addresses = [{id:'address1'}];

	$scope.addNewAddress = function(){
		var newAddressNo = $scope.addresses.length+1;
		$scope.addresses.push({id:'address'+newAddressNo});
	};

	$scope.removeAddress = function(){
		var lastAddress = $scope.addresses.length-1;
		$scope.addresses.splice(lastAddress);
	};

	// CRUD for properties
	$scope.createProp = function(){
		// CREATE VALIDATIONS FOR EMPTY FIELDS
		$scope.newProp.address = $scope.addresses;
		propFactory.createProp($scope.newProp, function(){
			$location.url('/properties');
		});
	};

	// update function that redirects to props after completing
	$scope.updateProp = function(){
		console.log($scope.newProp)
		propFactory.updateProp($routeParams.id, $scope.newProp, function(){
			$scope.backToProps();
		})
	}

	// Checks URL for params and the word properties to grab property info
	if($routeParams.id&&$location.absUrl().includes('properties')){
		propFactory.getProp($routeParams.id, function(data){
			$scope.newProp = data;
			$scope.addresses = $scope.newProp.address;
			$scope.title = "Edit Property";
			$scope.button = "Update";
			$scope.function = $scope.updateProp
		})
	} else {
		$scope.title = "Add New Property";
		$scope.button = "Create";
		$scope.function = $scope.createProp;
	}

	// Gets all properties for prop partial on admin page
	function getProps(){
		propFactory.getProps(function(data){
			$scope.prop_list = data;
		})
	}
	getProps();

	// delete function
	$scope.deleteProp = function(id){
		propFactory.deleteProp(id, function(data){
			getProps()
		})
	}

	// functions to navigate to certain pages 
	$scope.backToProps = function(){
		$location.url('/properties')
	}

	$scope.toShowProp = function(id){
		$location.url('/properties/show/'+id)
	}

	$scope.toEditProp = function(id){
		$location.url('/properties/edit/'+id)

	}

}]);