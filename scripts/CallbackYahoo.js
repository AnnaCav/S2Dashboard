var lastBuildDate;
var latsun;

/* callback function which extracts data from Yahoo */
var callbackFunction = function getWeather(data) {
	var location = data.query.results.channel.location;
	lastBuildDate = data.query.results.channel.lastBuildDate;
	latsun = data.query.results.channel.item.lat;
	var temp = data.query.results.channel.item.condition.temp;
	var text = data.query.results.channel.item.condition.text;
	var icon = data.query.results.channel.item.condition.code;
    var wind = data.query.results.channel.wind;
	var dir = data.query.results.channel.wind.direction;
	var atmosphere = data.query.results.channel.atmosphere;
	var astronomy = data.query.results.channel.astronomy;
	var forecast0 = data.query.results.channel.item.forecast[0]
	var forecast1 = data.query.results.channel.item.forecast[1]
	var forecast2 = data.query.results.channel.item.forecast[2]
	var forecast3 = data.query.results.channel.item.forecast[3]
	var forecast4 = data.query.results.channel.item.forecast[4]
	var forecast5 = data.query.results.channel.item.forecast[5]
	var forecast6 = data.query.results.channel.item.forecast[6]
	var forecast7 = data.query.results.channel.item.forecast[7]
	var forecast8 = data.query.results.channel.item.forecast[8]
	var forecast9 = data.query.results.channel.item.forecast[9]
	
	/* write data about the current weather in visible HTML file */
	document.getElementById("location").value = location.city;
	document.getElementById("date").value = lastBuildDate;
	document.getElementById("country").value = location.country;
	document.getElementById("region").value = location.region;
	document.getElementById("temp").value = temp;
	document.getElementById("text").value = text;
	document.getElementById("icon0").innerHTML = "<img src='icons/" + icon + ".png' style='height:40px'>";
	document.getElementById("high0").value = forecast0.high;
	document.getElementById("low0").value = forecast0.low;
	document.getElementById("textfor").value = forecast0.text;
	document.getElementById("iconfor").innerHTML = "<img src='icons/" + forecast1.code + ".png' style='height:40px'>";
	document.getElementById("humidityvalue").value = atmosphere.humidity;
	document.getElementById("visibility").value = atmosphere.visibility;
	document.getElementById("sunrise").value = astronomy.sunrise;
	document.getElementById("sunset").value = astronomy.sunset;
	
	/* choose background adapted to the current weather situation */
	if (icon == 25 || icon == 32 || icon == 34 || icon == 36){
		document.body.style.backgroundImage = "url('Background/sun.jpg')";}
	else if (icon == 19 || icon == 20 || icon == 21 || icon == 22){
		document.body.style.backgroundImage = "url('Background/dust.jpg')";}
	else if (icon == 5 ||icon == 6 || icon == 8 || icon == 9 || icon == 10 || icon == 11 || icon == 12 || icon == 35 || icon == 40 ){
		document.body.style.backgroundImage = "url('Background/rain.jpg')";}
	else if (icon == 7 || icon == 13 || icon == 14 || icon == 15 || icon == 16 || icon == 17 || icon == 18 || icon == 41 || icon == 42 || icon == 43 || icon == 46){
		document.body.style.backgroundImage = "url('Background/snow.jpg')";}
	else if (icon == 3 || icon == 4 || icon == 37 || icon == 38 || icon == 39 || icon == 45 || icon == 47){
		document.body.style.backgroundImage = "url('Background/thunderstorm.jpg')";}
	else if (icon == 0 || icon == 1 || icon == 2 || icon == 23 || icon == 24){
		document.body.style.backgroundImage = "url('Background/wind.jpg')";}
	else if (icon == 31 || icon == 33){
		document.body.style.backgroundImage = "url('Background/moon.jpg')";}
	else {
		document.body.style.backgroundImage = "url('Background/cloud.jpg')";}
	
	/* write data about the forecast in visible HTML file */
	document.getElementById("day1").value = forecast1.day
	document.getElementById("date1").value = forecast1.date;
	document.getElementById("icon1").innerHTML = "<img src='icons/" + forecast1.code + ".png' style='height:16px'>";
	document.getElementById("description1").value = forecast1.text;
	document.getElementById("high1").value = forecast1.high;
	document.getElementById("low1").value = forecast1.low;
	
	document.getElementById("day2").value = forecast2.day;	
	document.getElementById("date2").value = forecast2.date;
	document.getElementById("icon2").innerHTML = "<img src='icons/" + forecast2.code + ".png' style='height:16px'>";
	document.getElementById("description2").value = forecast2.text;
	document.getElementById("high2").value = forecast2.high;
	document.getElementById("low2").value = forecast2.low;
	
	document.getElementById("day3").value = forecast3.day;	
	document.getElementById("date3").value = forecast3.date;
	document.getElementById("icon3").innerHTML = "<img src='icons/" + forecast3.code + ".png' style='height:16px'>";
	document.getElementById("description3").value = forecast3.text;
	document.getElementById("high3").value = forecast3.high;
	document.getElementById("low3").value = forecast3.low;
	
	document.getElementById("day4").value = forecast4.day;	
	document.getElementById("date4").value = forecast4.date;
	document.getElementById("icon4").innerHTML = "<img src='icons/" + forecast4.code + ".png' style='height:16px'>";
	document.getElementById("description4").value = forecast4.text;
	document.getElementById("high4").value = forecast4.high;
	document.getElementById("low4").value = forecast4.low;
	
	document.getElementById("day5").value = forecast5.day;	
	document.getElementById("date5").value = forecast5.date;
	document.getElementById("icon5").innerHTML = "<img src='icons/" + forecast5.code + ".png' style='height:16px'>";
	document.getElementById("description5").value = forecast5.text;
	document.getElementById("high5").value = forecast5.high;
	document.getElementById("low5").value = forecast5.low;
	
	document.getElementById("day6").value = forecast6.day;	
	document.getElementById("date6").value = forecast6.date;
	document.getElementById("icon6").innerHTML = "<img src='icons/" + forecast6.code + ".png' style='height:16px'>";
	document.getElementById("description6").value = forecast6.text;
	document.getElementById("high6").value = forecast6.high;
	document.getElementById("low6").value = forecast6.low;
	
	document.getElementById("day7").value = forecast7.day;	
	document.getElementById("date7").value = forecast7.date;
	document.getElementById("icon7").innerHTML = "<img src='icons/" + forecast7.code + ".png' style='height:16px'>";
	document.getElementById("description7").value = forecast7.text;
	document.getElementById("high7").value = forecast7.high;
	document.getElementById("low7").value = forecast7.low;
	
	document.getElementById("day8").value = forecast8.day;	
	document.getElementById("date8").value = forecast8.date;
	document.getElementById("icon8").innerHTML = "<img src='icons/" + forecast8.code + ".png' style='height:16px'>";
	document.getElementById("description8").value = forecast8.text;
	document.getElementById("high8").value = forecast8.high;
	document.getElementById("low8").value = forecast8.low;
	
	document.getElementById("day9").value = forecast9.day;	
	document.getElementById("date9").value = forecast9.date;
	document.getElementById("icon9").innerHTML = "<img src='icons/" + forecast9.code + ".png' style='height:16px'>";
	document.getElementById("description9").value = forecast9.text;
	document.getElementById("high9").value = forecast9.high;
	document.getElementById("low9").value = forecast9.low;
  };

