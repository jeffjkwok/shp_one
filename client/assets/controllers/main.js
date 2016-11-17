app.controller('mainController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
        $scope.scroll = function(eID) {
            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for ( var i=startY; i<stopY; i+=step ) {
                    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for ( var i=startY; i>stopY; i-=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }
        }

        // Map Init
        var locations = [
            [ 'Pasadena/Inland Empire West', 34.145716, -118.098421, 'Eva Kwok', '2500 E. Colorado Blvd, Suite 509, Pasadena, CA 91107' ],
            [ 'Inland Empire', 34.065284, -117.288475, 'Jamie Johnson', '225 W. Hospitality Lane, Suite 206, San Bernardino, CA 92408' ],
            [ 'South Bay', 33.886049, -118.353017, 'Dwight Everest', '15901 Hawthorne Blvd, Suite 332, Lawndale, CA 90260' ],
            [ 'Long Beach', 33.822697, -118.189654, 'Paul Justice', '3605 Long Beach Blvd, Suite 450, Long Beach, CA 90807' ],
            [ 'Orange County North', 33.858222, -117.907501, 'Jennifer Lovelace', '1661 N. Raymond Ave, Suite 130, Anaheim, CA 92801' ],
            [ 'Orange County', 33.859547, -118.026174, 'Brian Plotkin', '6131 Orangethorpe Ave, Suite 330, Buena Park, CA 90620' ],
            [ 'Orange County South', 33.747934, -117.874402, 'Brandon Evans', '660 W. Santa Ana Blvd, Suite 800, Santa Ana, CA 92701' ],
            ['Senior Living and Apartments', 33.818468, -118.197389, 'James Bender', '3360 Magnolia Ave, Long Beach, CA 90806']
        ];

        $scope.initialize = function(){
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 9,
                center: new google.maps.LatLng(33.971990, -117.727669),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                scaleControl: false,
                scrollwheel: false,
                draggable: true
            });

            $scope.map.setCenter(new google.maps.LatLng(33.971990, -117.727669));
            setMarkers(map, locations);
        }

        function setMarkers(map, locations) {
            var marker, i
            for (i = 0; i < locations.length; i++) {
                var name = locations[i][0];
                var lat = locations[i][1];
                var long = locations[i][2];
                var manager = locations[i][3]
                var add = locations[i][4];
                latlngset = new google.maps.LatLng(lat, long);
                var marker = new google.maps.Marker({map: $scope.map, title: name, position: latlngset});
                $scope.map.setCenter(marker.getPosition())
                var content = '<div class="info"><h4 class="info-title">SHP District: <br>' + name + '</h4><p>Manager: ' + manager + '</p><p>' + add + '</p><p><a href="google.com">Find a Space</a></p></div>'
                var infowindow = new google.maps.InfoWindow()

                google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    };
                })(marker, content, infowindow));
            }
        }

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2rqTRzxmNggw_C3sEjVDoYDHQsS_isbM&callback=initMap';
        document.body.appendChild(script);
        setTimeout(function() {
            $scope.initialize();
        }, 500);
        //*********

    }
]);
