app.directive('submit', function ($injector) {
    return {  
        restrict: 'A',
        link: function (scope, element, attrs) {

        	$(element).on('click', function(event){
        		event.preventDefault();
        		var service = $injector.get(attrs.service);
        		service.deleteRegistry(attrs.id).then(function(response) {
        			$(element).parents('tr').remove();
        			console.log(response, "Success");
        		}).catch(function (response) {
					console.log(response, "Error");
				});
        	});

        }  
    };  
});