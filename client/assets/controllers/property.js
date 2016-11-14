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

	if($routeParams.id&&$location.absUrl().includes('properties')){
		propFactory.getProp($routeParams.id, function(data){
			$scope.newProp = data;
			$scope.addresses = $scope.newProp.address;
			$scope.title = "Edit Property";
			$scope.button = "Update";
		})
	} else {
		$scope.title = "Add New Property"
		$scope.button = "Create"
	}

	function getProps(){
		propFactory.getProps(function(data){
			$scope.prop_list = data;
		})
	}
	getProps();

	$scope.deleteProp = function(id){
		propFactory.deleteProp(id, function(data){
			getProps()
		})
	}

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