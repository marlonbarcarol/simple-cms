app.controller('aboutAddCtrl', function($scope, sendForm) {
	$scope.module = "About";
	$scope.url = "about";
	$scope.addRegistry = sendForm.addRegistry;
});