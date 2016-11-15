var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/admin/login.html'
	}).when('/dashboard',{
		templateUrl: '/partials/admin/dashboard.html'
	}).when('/users', {
		templateUrl: '/partials/admin/users.html'
	}).when('/properties', {
		templateUrl: '/partials/admin/properties.html'	
	}).when('/properties/new', {
		templateUrl: '/partials/admin/newProp.html'
	}).when('/properties/show/:propId', {
		templateUrl: '/partials/admin/showProp.html'
	}).when('/properties/edit/:propId',{
		templateUrl: '/partials/admin/newProp.html'
	}).when('/users/edit/:userId', {
		templateUrl: '/partials/admin/editUsers.html'
	}).when('/images',{
		templateUrl: '/partials/admin/imageUpload.html'
	})
})