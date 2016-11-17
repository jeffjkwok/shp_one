var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/main/main.html'
	})
	.when('/scroll/:eID', {
		templateUrl: '/partials/main/main.html'
	})
	.when('/:dist', {
		templateUrl: '/partials/districts/districtInfo.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})
