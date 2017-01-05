app.controller('contactAddCtrl', function($scope, contatoAPI, sendForm) {
	$scope.module = "Contacts";
	$scope.url = "contact";
	$scope.addRegistry = sendForm.addRegistry;

});