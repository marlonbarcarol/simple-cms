app.controller('userAddCtrl', function($scope, sendForm) {
	$scope.module = "Users";
	$scope.url = "user";
	$scope.formData.type = "user";
	$scope.addRegistry = sendForm.addRegistry;
});