app.controller('serviceAddCtrl', function($scope, sendForm) {
	$scope.module = "Services";
	$scope.url = "service";
	$scope.addRegistry = sendForm.addRegistry;
});