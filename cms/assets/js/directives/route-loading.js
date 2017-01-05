app.directive('routeLoading', function ($rootScope) {
  return {
	restrict:'A',
	template:"<h1 ng-if='isRouteLoading'>Loading...</h1>",
	link:function(scope, elem, attrs){
	  scope.isRouteLoading = false;

	  $rootScope.$on('$routeChangeStart', function(){
		scope.isRouteLoading = true;
	  });

	  $rootScope.$on('$routeChangeSuccess', function(){
		scope.isRouteLoading = false;
	  });
	}
  };
});