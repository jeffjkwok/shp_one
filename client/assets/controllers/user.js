app.controller('userController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams){
	// Login; dont know how many error messages we need
	$scope.login = function(){
		userFactory.login($scope.user, function(data){
			$location.url('/dashboard');
		}, function(){
			alert('User does not exist.');
		}, function(){
			alert('Password does match exisiting password.');
		})
	}

	// Checks users in session
	userFactory.checkUser(function(data){
			$scope.currentUser = data.user;
			if(!$scope.currentUser){
				$location.url('/');
			}
	})

	// Function to create a users; then runs the getUser function to update information in real time
	$scope.createUser = function(){
		console.log($scope.user)
		userFactory.createUser($scope.user, function(data){
			$scope.users = {};
			getUsers();
		})
	}

	// Gets list of users from database on page load.
	function getUsers(){
		userFactory.getUsers(function(data){
			$scope.user_list = data;
		})
	}
	getUsers()

	// function that switches to update User partial 
	$scope.toUpdatePage = function(id){
		$location.url('/users/edit/'+id)
	}

	if($routeParams.id){
		userFactory.getUser($routeParams.id, function(data){
			$scope.userToUpdate = data
		})
	}

	$scope.deleteUser = function(id){
		userFactory.deleteUser(id, function(data){
			console.log('user deleted')
		})
	}

	// $scope.backToUsers = function(){
	// 	$location.url('/users')
	// }
}])