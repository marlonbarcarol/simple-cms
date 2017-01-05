app.controller('serviceCtrl', function($scope, $http, pages) {
	$scope.module = "Services";
	$scope.url = "service";
	
	$scope.pages = pages;
});