var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
	$routeProvider
	.when('/:dist', {
		templateUrl: '/partials/districts/districtInfo.html'
	})
	.otherwise({
		redirectTo: '/:dist'
	})
})