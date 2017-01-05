app.controller('aboutCtrl', function($scope, registries) {
	$scope.module = "About";
	$scope.url = "about";
	
	$scope.registries = registries;
});