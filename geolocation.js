$("#submit-new-cinema").on("click", storeCinema);
$("#submit-nearest").on("click", getNearestCinema);


function storeCinema(){
	var name = $('#cinema-name').val();
	var latitude = $('#cinema-latitude').val();
	var longitude =$('#cinema-longitude').val();


	window.localStorage.setItem(name, latitude + "," + longitude);
	console.log(window.localStorage.getItem(name));
	
}



function getNearestCinema () {
	if (checkActiveGeo()){
		navigator.geolocation.getCurrentPosition(onLocation, onError);
	}

}

function checkActiveGeo () {
	if ("geolocation" in navigator) {
		console.log("geo is ready for you baby");
		return true;
	} else {
		console.log("No geo. Sorry");
		return false;
	}
}

function onLocation(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	compareCinemaDistances(lat, lon);
}

function compareCinemaDistances(latitude, longitude){
	listOfCinemas = Object.keys(window.localStorage);
	var nearestDistance;
	var returnedDistance;
	var index = 0;
	var i = 0;
	for (i  ; i < listOfCinemas.length; i++) {
		var cinemaLocation = window.localStorage.getItem(listOfCinemas[i]);
		var cinemaLat = cinemaLocation.split(",")[0];
		var cinemaLon = cinemaLocation.split(",")[1];

		returnedDistance = calculateDistance(parseFloat(latitude), parseFloat(longitude), parseFloat(cinemaLat), parseFloat(cinemaLon));
		
		// console.log(returnedDistance);		

		if (i === 0) {
			console.log("i===0")
			nearestDistance = returnedDistance;
		} else if (returnedDistance < nearestDistance) {
			console.log("returnedDistance")
			nearestDistance = returnedDistance;
			index = i;
		} else {
			console.log("No cinemas stored");
		}
	}
	var nearestCinema = listOfCinemas[index];
	console.log(nearestCinema);
}

function calculateDistance(personLat, personLon, cinemaLat, cinemaLon){
	console.log("personLat: %s , personLon: %s , cinemaLat: %s , cinemaLon: %s ",personLat, personLon, cinemaLat, cinemaLon);
	var cathethus1 = Math.abs(personLat - cinemaLat);
	var cathethus2 = Math.abs(personLon - cinemaLon);

	return Math.sqrt(Math.pow(cathethus1,2) + Math.pow(cathethus2,2));
	// return Math.sqrt((Math.pow(Math.abs((personLat - cinemaLat)),2) + Math.pow(Math.abs((personLon - cinemaLon))),2));
}

function onError (error) {
	console.log(error)
}
