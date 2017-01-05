app.controller('aboutEditCtrl', function($scope, registry, sendForm) {
	$scope.module = "About";
	$scope.url = "about";
	$scope.registry = registry;
	$scope.editRegistry = sendForm.editRegistry;
});