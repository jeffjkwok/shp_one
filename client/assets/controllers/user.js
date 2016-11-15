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
		userFactory.createUser($scope.user, function(){
			$scope.user = {};
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

	// checks the URL to see if there is an unique ID if there is then it pulls the user of that specific ID
	if($routeParams.id&&$location.absUrl().includes('users')){
		userFactory.getUser($routeParams.id, function(data){
			$scope.newUser = {}
			$scope.newUser.username = data.username;
		})
	}

	$scope.updateUser = function(user){
		userFactory.updateUser($routeParams.id, user, function(){
			$scope.backToUsers()
		})
	}

	// Function to delete a user on the "manage users page"
	$scope.deleteUser = function(id){
		console.log("scope delete")
		userFactory.deleteUser(id, function(data){
			getUsers()
		})
	}

	$scope.backToUsers = function(){
		$location.url('/users')
	}
}])