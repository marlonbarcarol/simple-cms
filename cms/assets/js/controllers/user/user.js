app.controller('userCtrl', function($scope, $http, users) {
	$scope.module = "Users";
	$scope.url = "user";

	$scope.users = users;
});