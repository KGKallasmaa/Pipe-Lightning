let map;
function initMap() {
	map = new google.maps.Map(document.getElementById('google-map'), {
		center: { lat: -34.397, lng: 150.644 },
		zoom: 2,
		mapTypeId: 'satellite'
	});
	fetch('/deals')
		.then(res => res.json())
		.then(createMarkers);
}

function createMarkers(markers) {
	markers.map(el => {
		const marker = new google.maps.Marker({
			position: el,
			map: map,
			title: 'coordinates',
			animation: google.maps.Animation.DROP
		});
		marker.addListener('click', () => toggleBounce(marker));
		return marker;
	});
}

function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}
