app.controller('contactEditCtrl', function($scope, registry, sendForm) {
	$scope.module = "Contacts";
	$scope.url = "contact";
	$scope.registry = registry;
	$scope.editRegistry = sendForm.editRegistry;
});