	var lat;
	var lon;
	var latlon;
	var newMarker
	var acquisition;
	var overflight;
	var timediff
	var text;
	var flight;

	function onMapClick(e) {

			if (typeof(newMarker)==='undefined'){
				newMarker = new L.marker(e.latlng, { draggable: true });
				newMarker.addTo(satMap);}
			else { newMarker.setLatLng(e.latlng);}
			
			zoomLev = satMap.getZoom();
			if (zoomLev < 5){
			satMap.setView(e.latlng, 5);}
			else {zoomLev == zoomLev;}

			lat = e.latlng.lat;
			lon = e.latlng.lng;
			latlon = e.latlng;
						
			localStorage.setItem('x', lon);
			localStorage.setItem('y', lat);
			
			loadAcquisition();

			var popup=L.popup({maxWidth: "auto"});
	
			popup
					.setLatLng(latlon)
					.setContent("Loading...")
					.openOn(satMap);			
			
			
}

	satMap.on('click', onMapClick);
	
				function loadAcquisition() {
				var link = 'http://sentinel-dashboard.zgis.at/geoserver/s2/ows?service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&typeName=s2:upcoming_s2_acquisitions&CQL_FILTER=CONTAINS(geom,Point('+lat+' '+lon+'))';	
				  var xhttp = new XMLHttpRequest();
				  xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
					  acqFunction(this);
					}
				  };
				  xhttp.open("POST", link, true);
				  xhttp.send();
				  }
				  function acqFunction(xml){
				  var satdata = JSON.parse (xml.responseText);
				  var tF = Number(satdata.totalFeatures);
				  acquisition = [];
				  for (i=0; i<tF; i++){
					acquisition.push(satdata.features[i].properties.satellite, satdata.features[i].properties.observationtimestart, satdata.features[i].properties.observationtimestop, satdata.features[i].properties.timeliness, satdata.features[i].properties.mode);
					}
				  loadOverflight();
					}
					
				function loadOverflight() {
				var link = "http://sentinel-dashboard.zgis.at/geoserver/s2/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=s2:upcoming_s2_passes&maxFeatures=50&outputFormat=application/json&viewparams=LAT:"+lat+";LON:"+lon;
				  var xhttp = new XMLHttpRequest();
				  xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
					  ovfFunction(this);
					}
				  };
				  xhttp.open("POST", link, true);
				  xhttp.send();
				  }
				  function ovfFunction(xml){
				  var satflight = JSON.parse (xml.responseText);
				  overflight = [satflight.features[1].properties.satellite, satflight.features[0].properties.orbit, satflight.features[0].properties.timestamp_sattime, satflight.features[0].properties.duration_sattime];
				  loadTime();
					}
					
				function loadTime() {
				var key="61HI0U0RUHOM";
				var link = "http://api.timezonedb.com/v2/get-time-zone?key="+key+"&format=json&by=position&lat="+lat+"&lng="+lon;
				  var xhttp = new XMLHttpRequest();
				  xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
					  timeFunction(this);
					}
				  };
				  xhttp.open("POST", link, true);
				  xhttp.send();
				  }
				  function timeFunction(xml){
				  var data = JSON.parse (xml.responseText);
				  timediff = parseInt((data.gmtOffset)/3600);

					createText();
					}
					
				function createText(){
				
				text="<table style='text-align:center;vertical-align:middle; border-spacing:5px;'><tr><td><b>Satellite</b></td><td><b>Start (UTC)</b></td><td><b>Stop (UTC)</b></td><td><b>Timeliness</b></td><td><b>Mode</b></td></tr><tr>";
				for (i=0; i<acquisition.length; i++){
					if([i + 1] % 5 == 0){
					text += "<td>" + acquisition[i] + "</td></tr><tr>";}
					else{
					text += "<td>" + acquisition[i] + "</td>";}
				}
				text = text.substring(0, text.length - 4);
				text += "</table>";
				
				/* error function if array is empty */
				if (acquisition == ""){
				text = "There will be no acquisition in the next few days. Please try it at another time.";
				}
				
				flight = "<b>Satellite:</b> "+overflight[0]+"<br><b>Orbit:</b> "+overflight[1]+"<br><b>Time:</b> "+overflight[2]+"<br><b>Duration until overflight (d/h/m/s):</b> "+overflight[3];
				
				now()
				}

	function now(){

	var popup=L.popup({maxWidth: "auto"});
	
	popup
			.setLatLng(latlon)
			.setContent("<b>Local time: UTC " + timediff + "h</b><br><br><b>Next acquisitions:</b><br>" + text + "<br><br><b>Next overflight:</b><br>" + flight)
			.openOn(satMap);
	}
