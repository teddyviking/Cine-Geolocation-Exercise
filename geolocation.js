$("#button-submit").on("click", storeCinema);

function storeCinema(){
	var name = $('#cinema-name').val();
	var latitude = $('#cinema-latitude').val();
	var longitude =$('#cinema-longitude').val();



	window.localStorage.setItem(name, latitude + "," + longitude);
}