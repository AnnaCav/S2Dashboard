/*################## Get marker position - Anna-Maria Cavallaro April 2018 #################*/

/* get clicked position of the marker in map and submit form*/
function getMarker(){
	var x = localStorage.getItem("x");
	var y = localStorage.getItem("y");
	document.getElementById("coordlon").value=x;
	document.getElementById("coordlat").value=y;
	localStorage.removeItem("x");
	localStorage.removeItem("y");
	document.getElementById("geolocation").submit();
	}
