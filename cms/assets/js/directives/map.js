app.directive('map', function () {  
    return {  
        restrict: 'A', 
        link: function (scope, element, attrs) {  
            var mapOptions = {
				scrollwheel: false,
				center: new google.maps.LatLng(attrs.latitude, attrs.longitude),
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(element[0],mapOptions);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(attrs.latitude, attrs.longitude),
				scrollwheel: false,
				map: map,
				//icon: 'css/images/ico-maps-pin.png',
			});
        }  
    };  
});