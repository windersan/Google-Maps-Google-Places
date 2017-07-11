function initMap() {
  
   var myLatlng = new google.maps.LatLng(32.7157,-117.1611);
  var kievLatLng = new google.maps.LatLng(50.4501, 30.5234);
  
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    
    styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#D50000'}]},
            
           
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#D50000'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#FFAB00'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#FFAB00'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    
        });

  

  
  
  
  
        var input = document.getElementById('pac-input');

        var autocomplete = new google.maps.places.Autocomplete(
            input, {placeIdOnly: true});
        autocomplete.bindTo('bounds', map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var geocoder = new google.maps.Geocoder;
        var marker = new google.maps.Marker({
          map: map
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          var place = autocomplete.getPlace();
          
          if (!place.place_id) {
            return;
          }
          geocoder.geocode({'placeId': place.place_id}, function(results, status) {

            if (status !== 'OK') {
              window.alert('Geocoder failed due to: ' + status);
              return;
            }
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            // Set the position of the marker using the place ID and location.
            marker.setPlace({
              placeId: place.place_id,
              location: results[0].geometry.location
            });
            marker.setVisible(true);
            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-id1'].textContent = place.place_id;
            infowindowContent.children['place-address'].textContent =
                results[0].formatted_address;
            infowindow.open(map, marker);
          });
        });
  
  
  
  var geocoder2 = new google.maps.Geocoder;
        var infowindow2 = new google.maps.InfoWindow;

        document.getElementById('submit').addEventListener('click', function() {
          geocodePlaceId(geocoder, map, infowindow);
        });
  
  
  
  
  
  
      }
    






 function geocodePlaceId(geocoder2, map, infowindow2) {
        var placeId = document.getElementById('place-id').value;
        geocoder2.geocode({'placeId': placeId}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(11);
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
              });
              infowindow2.setContent(results[0].formatted_address);
              infowindow2.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }