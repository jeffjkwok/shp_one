var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/login.html'
	}).when('/dashboard',{
		templateUrl: '/partials/dashboard.html'
	}).when('/users', {
		templateUrl: '/partials/users.html'
	}).when('/properties', {
		templateUrl: '/partials/properties.html'
	}).when('/users/edit/:id', {
		templateUrl: '/partials/editUsers.html'
	})
})