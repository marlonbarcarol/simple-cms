app.directive('delete', function ($injector, serviceAPI) {
    return {  
        restrict: 'A',
        link: function (scope, element, attrs) {

        	$(element).on('click', function(event){
        		event.preventDefault();
                if( !confirm("Are you sure you want to delete this record?") ) {
                    return false;
                }
                
        		serviceAPI.deleteRegistry(attrs.url, attrs.id).then(function(response) {
        			$(element).parents('tr').fadeIn().remove();
        		}).catch(function (response) {
                    $(".message").addClass("alert").text('Error to delete record.');
				});
        	});

        }  
    };  
});