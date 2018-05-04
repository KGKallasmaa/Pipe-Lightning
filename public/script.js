let map;

const markers = [{ lat: 50.5689, lng: 60.4565 }, { lat: 51.5689, lng: 61.4565 }];

var max = Number.MIN_SAFE_INTEGER;
var min = Number.MAX_SAFE_INTEGER;

var color_dict = {};
var colors = [
	'#663399',
	'#FF0000',
	'#BC8F8F',
	'#4169E1',
	'#8B4513',
	'#FA807',
	'#F4A460',
	'#F2E8B57',
	'#FFF5EE',
	'#A0522D',
	'#C0C0C0',
	'#87CEEB',
	'#6A5ACD',
	'#708090',
	'#708090',
	'#FFFAFA',
	'#00FF7F',
	'#4682B4',
	'#D2B48C',
	'#008080',
	'#D8BFD8',
	'#FF6347',
	'#40E0D0',
	'#EE82EE',
	'#F5DEB3',
	'#FFFFFF',
	'#F5F5F5',
	'#FFFF00',
	'#9ACD32'
];

var user_name_sum = {};

function initMap() {
	map = new google.maps.Map(document.getElementById('google-map'), {
		center: { lat: 43, lng: 25 },
		zoom: 2
	});

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(
				position.coords.latitude,
				position.coords.longitude
			);
			map.setCenter(initialLocation);
		});
	}

	setInterval(function() {
		fetch('/deals')
			.then(res => res.json())
			.then(createMarkers);
	}, 1000);
}

function createMarkers(markers) {
	if (false) {
		var markers = {};
		markers['deals'] = [];
		var data = {
			user_id: 1355020,
			status: 'won',
			lat: 58.3606987,
			label: 'sample point',
			long: 26.7277565
		};
		markers['deals'].push(data);
	}
	markers.deals.map(el => {
		var pos = { lat: el.lat, lng: el.long };

		if (el.value < min) {
			min = el.value;
		} else if (el.value > max) {
			max = el.value;
		}

		if (colors.size != 0 && !(el.user_id in color_dict)) {
			var color = colors[Math.floor(Math.random() * colors.length)];
			color_dict[el.user_id] = color;
			var index = colors.indexOf(color);
			if (index > -1) {
				colors.splice(index, 1);
			}
		}
		//increase revenue
		change_revenue(el.user_id, el.value);

		var size = size_f(el.value);
		const marker = new google.maps.Marker({
			position: pos,
			map: map,
			title: el.value,
			animation: google.maps.Animation.DROP,
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: size,
				fillColor: color_dict[el.user_id],
				label: el.title,
				fillOpacity: 1,
				strokeWeight: 0.2
			}
		});
		moneySound();
		marker.addListener('click', () => toggleBounce(marker));

		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			marker.setAnimation(null);
		}, 3750);

		//update leadership board

		var sales_data = [];

		for (var key in user_name_sum) {
			sales_data.push('<br>', '<p>' + 'hi' + '</p>', '</br>');
		}

		document.getElementById('name_revenue').innerHTML = sales_data.join('');
		return marker;
	});
}

function size_f(value) {
	var value_per_cat = (max - min) / 13.0;
	var local_min = min;

	if (value == local_min) {
		return 6.0;
	} else if (value == max) {
		return 20;
	}
	var i = -1;

	while (local_min < value) {
		local_min = local_min + value_per_cat;
		i++;
	}
	return 6 + i;
}

function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);

		setTimeout(function() {
			marker.setAnimation(null);
		}, 750 * 10);
	}
}

function moneySound() {
	var audio = new Audio('http://freesound.org/data/previews/91/91924_634166-lq.mp3');
	audio.play();
}

function change_revenue(user_id, value) {
	// do we have that user_id?
	if (!(user_id in user_name_sum)) {
		//we don't
		user_name_sum[user_id] = value;
	} else {
		//we do
		user_name_sum[user_id] = user_name_sum[user_id] + value;
	}
}
