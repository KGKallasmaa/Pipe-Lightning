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
		//createMarkers(markers);
}



function createMarkers(markers) {
	if (!markers.isEmpty) {
		var markers = {};
		markers["deals"] = []
		var data = {
			user_id: 1355020,
			status: "won",
			lat:58.3606987,
			long:26.7277565
		};
		markers["deals"].push(data);
	}
	markers.deals.map(el => {
		var pos = { lat: el.lat, lng: el.long }
		const marker = new google.maps.Marker({
			position: pos,
			map: map,
			title: 'coordinates',
			animation: google.maps.Animation.DROP,
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 8,
				fillColor: '#F00',
				fillOpacity: 1,
				strokeWeight: 0.2
			}
		});
		marker.addListener('click', () => toggleBounce(marker));
		return marker;
	});
}


/*
function createMarkers(markers) {
	markers.map(el => {
		const marker = new google.maps.Marker({
			position: res.deals.lat, res.deals.long,
			map: map,
			title: 'coordinates',
			animation: google.maps.Animation.DROP
		});
		marker.addListener('click', () => toggleBounce(marker));
		return marker;
	});
}
*/

function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}
