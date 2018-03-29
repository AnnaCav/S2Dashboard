/*##########################Creation of MapContent and Satellite overflight prediction - Anna-Maria Cavallaro, Martin Sudmanns April 2018 ######################*/	
  
  /* set variable for map */
  var satMap = L.map('main-map-view').setView([0, 0], 1);

	/* set basemap */
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 18,
		minZoom: 0,
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		    'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributor',
    }).addTo(satMap);

	/* set default center of map to the Atlantik*/
	satMap.setView(new L.LatLng(20.532357, -39.095601), 2);
	
  /* set click function*/
	satMap.on('click', onMapClick);
    
	/*acquisition Plan*/
    var wmsLayer = L.tileLayer.wms('http://cf000008.geo.sbg.ac.at:8888/geoserver/s2/ows?', {
	    layers: 's2:s2_acq_plan',
	    styles: 'Acq_Plan_Default',
	    transparent: 'true',
	    format: 'image/png'
    }).addTo(satMap);
	
	/*Day/Night effect*/
    L.terminator().addTo(satMap);
    
	/*satellite position*/
    var satellites = [];
    
	/*Initialise satellites with 0/0 position*/
    /*Anchor is for icon offset*/
    satellites[0] = L.marker([0, 0],{icon: new L.icon({iconUrl: 'icons/s2.png',iconAnchor: [30, 42]})}).addTo(satMap);
    satellites[1] = L.marker([0, 0],{icon: new L.icon({iconUrl: 'icons/s2.png',iconAnchor: [30, 42]})}).addTo(satMap);
    
    /*Initialise and launch predictlib*/
    PLib.InitializeData();
    
	/*This function updates the marker position*/
    function makeUpdateMarkerFunction(satellites){
	    return function(){
		    for (var i=0; i<satellites.length; i++){
			    var satInfo = PLib.QuickFind(PLib.sat[i].name);
			    satellites[i].setLatLng([satInfo.latitude, satInfo.longitude]);
				if (PLib.sat[i].name == "AQUA"){
				satellites[i].bindPopup("Sentinel 2B");}
				else {satellites[i].bindPopup(PLib.sat[i].name);}
				satellites[i].on('mouseover', function (e) {
				this.openPopup();
				});
				satellites[i].on('mouseout', function (e) {
					this.closePopup();
				});
		    }
	    }
    }
    
	/*Set interval for updating marker position*/
    setInterval(makeUpdateMarkerFunction(satellites), 1000);
    
	/*Satellite Forecast*/
    var colors = ['orange', 'red'];
    var satellites = ['S2A', 'S2B'];
    
    for (var s = 0; s < satellites.length; s++){
	    
	    
	    /*Get the forecast*/
	    var latlngs = PLib.QuickFindForecast(PLib.sat[s].name);
	    
	    /*Add the first element to a temporary array*/
	    var t_ll = [latlngs[0]]
	    
	    /*Iterate through the array*/
	    for (var i = 1; i < latlngs.length; i++){
		    
		    /*Longitudes are getting smaller. If it is larger, we have crossed the dateline*/
		    if (latlngs[i][1] > latlngs[i-1][1]){
			    /*Then take the temp array and draw it to the map*/
			    L.polyline(t_ll, {color: colors[s]}).addTo(satMap);
			    /*Instantiate a new array*/
			    t_ll = [latlngs[i]]
		    }
        else{
			    /*If we can proceed, add coordinates to the temp array*/
			    t_ll.push(latlngs[i]);
		    }
	    }
	}
