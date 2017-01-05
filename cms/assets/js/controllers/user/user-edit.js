app.controller('userEditCtrl', function($scope, user, sendForm) {
	$scope.module = "Users";
	$scope.url = "user";
	$scope.user = user;
	$scope.editRegistry = sendForm.editRegistry;
});