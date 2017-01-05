app.controller('contactCtrl', function($scope, registries) {
	$scope.module = "Contacts";
	$scope.url = "contact";
	$scope.registries = registries;
});