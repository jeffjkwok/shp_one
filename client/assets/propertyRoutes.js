var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
	$routeProvider
	.when('/Pasadena & Inland Empire West', {
		templateUrl: '/partials/districts/districtInfo.html'
	})
	.when('/hello', {
		templateUrl: '/partials/districts/districtInfo.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})