/*################## Open and clos sidebar - Anna-Maria Cavallaro April 2018 #################*/

/*open weather forecast*/
function openNav() {
    document.getElementById("mySidenav").style.width = "510px";
	document.getElementById("main-map-view").style.marginLeft = "510px";
	document.getElementById("sunbutton").style.marginLeft = "520px";
}

/*close weather forecast*/
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
	document.getElementById("main-map-view").style.marginLeft = "0px";
	document.getElementById("sunbutton").style.marginLeft = "10px";
}
