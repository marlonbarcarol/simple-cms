app.controller('serviceEditCtrl', function($scope, registry, sendForm) {
	$scope.module = "Services";
	$scope.url = "service";
	$scope.registry = registry;
	$scope.editRegistry = sendForm.editRegistry;
});