/*################## Set popup content - Anna-Maria Cavallaro April 2018 #################*/

	var lat;
	var lon;
	var latlon;
	var newMarker
	var acquisition;
	var overflight;
	var timediff
	var text;
	var flight;
  
  /*set popup on clicked position*/
	function onMapClick(e) {
		
			timeout = setTimeout(function(){ alert("Unfortunately the server is loading very slowly. Please try it again."); }, 90000);

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

  /*get next acquisition date*/
	satMap.on('click', onMapClick);
	
				function loadAcquisition() {
				var link = 'http://eo-compass.zgis.at/geoserver/s2/ows?service=WFS&version=2.0.0&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&typeName=s2:upcoming_s2_acquisitions&CQL_FILTER=CONTAINS(geom,Point('+lat+' '+lon+'))';	
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
				
        /*get next overflight date*/	
				function loadOverflight() {
				var link = "http://eo-compass.zgis.at/geoserver/s2/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=s2:upcoming_s2_passes&maxFeatures=50&outputFormat=application/json&viewparams=LAT:"+lat+";LON:"+lon;
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
					var current_time = new Date();
					function convertMillisecondsToHumanReadable(ms) {
						var d, h, m, s;
						s = Math.floor(ms / 1000);
						m = Math.floor(s / 60);
						s = s % 60;
						h = Math.floor(m / 60);
						m = m % 60;
						d = Math.floor(h / 24);
						h = h % 24;
						return d + "/" + h + "/" + m + "/" + s;
					};
					function findNextPassIndex(features){
						var lastTimestamp = null;
						var index = 0;
						for (var i=0;i<features.length;i++){
							if (lastTimestamp == null){
								lastTimestamp = features[i].properties.timestamp;
								index = i;
								continue;
							}
							if (features[i].properties.timestamp < lastTimestamp){
								index = i;
							}
						}
						return index;
					}
					var satflight = JSON.parse (xml.responseText);
					var i = findNextPassIndex(satflight.features);
				  overflight = [
							satflight.features[i].properties.satellite,
							satflight.features[i].properties.orbit,
							satflight.features[i].properties.timestamp,
							convertMillisecondsToHumanReadable(Date.parse(satflight.features[i].properties.timestamp) - current_time)
					];
				  loadTime();
					}
				
        /*get time difference*/	
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
				
        /* create text for content */	
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
				
				setContent()
				}

        /* display popup with content */
				function setContent(){
				var popup=L.popup({maxWidth: "auto"});
				
				popup
						.setLatLng(latlon)
						.setContent("<b>Local time: UTC " + timediff + "h</b><br><br><b>Next acquisitions:</b><br>" + text + "<br><br><b>Next overflight:</b><br>" + flight)
						.openOn(satMap);
						
				clearTimeout(timeout);
				}
