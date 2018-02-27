/* callback function which extracts data from OpenWeatherMap */
	var openWeather = function getWeather(data) {
		var now = data.list[0].dt_txt;
		var nowlast = now.substr(11,5);
		var nowcloud = data.list[0].clouds.all;
		var now3 = data.list[1].dt_txt;
		var nowlast3 = now3.substr(11,5);
		var nowcloud3 = data.list[1].clouds.all;
		var now6 = data.list[2].dt_txt;
		var nowlast6 = now6.substr(11,5);
		var nowcloud6 = data.list[2].clouds.all;		
		var now9 = data.list[3].dt_txt;
		var nowlast9 = now9.substr(11,5);
		var nowcloud9 = data.list[3].clouds.all;	
		var now12 = data.list[4].dt_txt;
		var nowlast12 = now12.substr(11,5);
		var nowcloud12 = data.list[4].clouds.all;	
		var now15 = data.list[5].dt_txt;
		var nowlast15 = now15.substr(11,5);
		var nowcloud15 = data.list[5].clouds.all;	
		var now18 = data.list[6].dt_txt;
		var nowlast18 = now18.substr(11,5);
		var nowcloud18 = data.list[6].clouds.all;	
		var now21 = data.list[7].dt_txt;
		var nowlast21 = now21.substr(11,5);
		var nowcloud21 = data.list[7].clouds.all;

		/* convert precipitation forecast data to a string */
		var prec = data.list[0].rain;
		var precold = JSON.stringify(prec);
		if (precold == null){
			var precnew = "na";}
		else {var precnew = precold.substr(6,3);}
		var prec3 = data.list[1].rain;
		var precold3 = JSON.stringify(prec3);
		if (precold3 == null){
			var precnew3 = "na";}
		else {var precnew3 = precold3.substr(6,3);}
		var prec6 = data.list[2].rain;
		var precold6 = JSON.stringify(prec6);
		if (precold6 == null){
			var precnew6 = "na";}
		else {var precnew6 = precold6.substr(6,3);}
		var prec9 = data.list[3].rain;
		var precold9 = JSON.stringify(prec9);
		if (precold9 == null){
			var precnew9 = "na";}
		else {var precnew9 = precold9.substr(6,3);}
		var prec12 = data.list[4].rain;
		var precold12 = JSON.stringify(prec12);
		if (precold12 == null){
			var precnew12 = "na";}
		else {var precnew12 = precold12.substr(6,3);}
		var prec15 = data.list[5].rain;
		var precold15 = JSON.stringify(prec15);
		if (precold15 == null){
			var precnew15 = "na";}
		else {var precnew15 = precold15.substr(6,3);}
		var prec18 = data.list[6].rain;
		var precold18 = JSON.stringify(prec18);
		if (precold18 == null){
			var precnew18 = "na";}
		else {var precnew18 = precold18.substr(6,3);}
		var prec21 = data.list[7].rain;
		var precold21 = JSON.stringify(prec21);
		if (precold21 == null){
			var precnew21 = "na";}
		else {var precnew21 = precold21.substr(6,3);}
		
		/* write data about cloud cover and precipitation in visible HTML file */
		document.getElementById("clouds0").value=nowcloud;
		document.getElementById("clouds3").value=nowcloud3;
		document.getElementById("clouds6").value=nowcloud6;
		document.getElementById("clouds9").value=nowcloud9;
		document.getElementById("clouds12").value=nowcloud12;
		document.getElementById("clouds15").value=nowcloud15;
		document.getElementById("clouds18").value=nowcloud18;
		document.getElementById("clouds21").value=nowcloud21;
		
		document.getElementById("dt0").value=nowlast;
		document.getElementById("dt3").value=nowlast3;
		document.getElementById("dt6").value=nowlast6;
		document.getElementById("dt9").value=nowlast9;
		document.getElementById("dt12").value=nowlast12;
		document.getElementById("dt15").value=nowlast15;
		document.getElementById("dt18").value=nowlast18;
		document.getElementById("dt21").value=nowlast21;
		
		document.getElementById("prec0").value=precnew;
		document.getElementById("prec3").value=precnew3;
		document.getElementById("prec6").value=precnew6;
		document.getElementById("prec9").value=precnew9;
		document.getElementById("prec12").value=precnew12;
		document.getElementById("prec15").value=precnew15;
		document.getElementById("prec18").value=precnew18;
		document.getElementById("prec21").value=precnew21;

	};