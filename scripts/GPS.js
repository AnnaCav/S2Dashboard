/*################## Get current GPS position - Anna-Maria Cavallaro April 2018 #################*/

/* get current GPS location */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

/* write current GPS location in the form and submit */
function showPosition(position) {
    var latitude = position.coords.latitude; 
    var longitude  = position.coords.longitude;
	document.getElementById("coordlat").value = latitude;
	document.getElementById("coordlon").value = longitude;
	document.getElementById("geolocation").submit();
	}
