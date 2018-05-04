let map;

const markers = [{lat: 50.5689, lng: 60.4565}, {lat: 51.5689, lng: 61.4565}];

var max = Number.MIN_SAFE_INTEGER;
var min = Number.MAX_SAFE_INTEGER;

var color_dict = {};
var colors = ['#F00', '#000000', '#808080','#800000','#FFFC33','#7FFF33','#33FFA4','#338AFF','#5933FF'];


function initMap() {
	map = new google.maps.Map(document.getElementById('google-map'), {
		center: { lat: 43, lng:25},
		zoom: 6,
	});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }

	fetch('/deals')
    setInterval(function() {
        fetch('/deals')
		.then(res => res.json())
		.then(createMarkers)
    }, 1000);
}



function createMarkers(markers) {
	if (markers.deals[0] === undefined) {
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

		if (el.value < min){min = el.value;}
        else if (el.value > max){max = el.value;}

        if (colors.size != 0){
		    var color = colors[Math.floor(Math.random()*colors.length)];
            color_dict[el.user_id] = color;
            var index = colors.indexOf(color);
            if (index > -1) {
                colors.splice(index, 1);
            }
        }



		var size = size_f(el.value);
		const marker = new google.maps.Marker({
			position: pos,
			map: map,
			title: el.value,
			animation: google.maps.Animation.DROP,
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: size,
				fillColor:color_dict[el.user_id],
				fillOpacity: 1,
				strokeWeight: 0.2
			}
		});
		marker.addListener('click', () => toggleBounce(marker));
		return marker;
	});
}

function size_f(value) {
    var value_per_cat = (max-min)/13.0;
    var local_min = min;

    if (value == local_min){
        return 6.0;
    }
    else if (value == max){
        return 20;
    }
    var i = -1;

    while (local_min < value){
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
        setTimeout(function(){ marker.setAnimation(null); }, 750*10);
	}
}
