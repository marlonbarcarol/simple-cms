app.directive('slider', function () {  
    return {  
        restrict: 'A',  
        link: function (scope, element, attrs) {  
            var options = scope.$eval($(element).attr('data-options'));
            $(element).owlCarousel(options);  
        }  
    };  
});