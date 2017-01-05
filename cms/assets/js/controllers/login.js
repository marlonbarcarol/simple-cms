app.controller('loginCtrl', function($scope, $http, $location, config) {
	$scope.isLoading = false;
	$scope.message = false;

	$scope.sendForm = function() {
		angular.element('#login .message').addClass("loading");
		$scope.isLoading = true;

		$http({
			method : "POST",
			url : "/api/login",
			data: $.param( $scope.formData ),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(function (response) {
			sessionStorage.setItem( 'user', JSON.stringify(response.data) );
			window.location = '/cms/dashboard';
			$scope.isLoading = false;
			$scope.message = false;
		}).catch(function (response) {
			console.log(response);
			$scope.isLoading = false;
			$scope.message = response.data.response;
		})
	}
});
