let map;
function initMap() {
	map = new google.maps.Map(document.getElementById('google-map'), {
        center: new google.maps.LatLng(-25.763, 132.044),
        zoom: 8,
        minZoom: 1
	});
    var myLatLng = {lat: -25.363, lng: 131.044};
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Test point!'
    });

}


