
<!--#####################Weather forecast PHP- Anna-Maria Cavallaro March 2018 - Dynamic PHP page for weather forecast ######################-->

<html>
<!-- Head -->
<head>
<meta charset="utf-8"/>

<!-- Font -->
<link rel="stylesheet" type="text/css" href= "styles/WeatherForecast.css">

</head>

<!-- Body -->
<body>
<!-- form and button for weather forecast of wanted city -->
<!-- form sends input data -->
<form action= "GetWeather.php" method="post" id="myForm">
<label>
	<input type="text" name="city" id="city" placeholder="Enter a city name" value=""/>
	<input type="submit" value="Submit" title="Submit city name"/>
</label>
</form>

<!-- hidden form for weather forecast of lon and lat -->
<!-- form sends input data -->
<form action="GetWeather.php" method="post" id="geolocation">
	<input type="hidden" id="coordlat" name="coordlat" value="" />
	<input type="hidden" id="coordlon" name="coordlon" value="" />
</form>

<!-- button for weather forecast of curren GPS location -->
<button onclick="getLocation()" id="geoloc" title="Get current Geolocation"><img src="images/Geolocation.png" alt="Get Geolocation" height="17px"></button>

<!-- button for weather forecast of clicked location -->
<button onclick="getMarker()" id="marker" name="Marker" title="Get current marker's position">Marker</button>


<!--#######################################-->
<!-- output in html page from weather data -->
<div id="Place">
<h1 style="font-size:36px; color:white; text-shadow:0 0 3px black; margin-bottom:10px">
	<output id="location" ></output>
</h1>
<p style="font-size:18px; color:white; text-shadow:0 0 3px black;margin-top:0px">
	<output id="region"></output>, <output id="country"></output>
</p>
<p style="font-size:18px; color:white; text-shadow:0 0 3px black;margin-top:0px">
<output id="date"></output> (last build date)
</p>
</div>
<br>

<div id="Temperature" >
<p style="font-size:100px; color:white; text-shadow:0 0 5px black; margin-top:0px;"><output id="temp"></output>°</p>
</div>

<div id="Unit">
<p style="font-size:24px; color:white; text-shadow:0 0 1px black">C</p>
</div>

<div id="minmax">
<p style="font-size:20px; color:white; text-shadow:0 0 1px black;">
	&uarr;<output id="high0"></output>°C
<br>
<br>
	&darr;<output id="low0"></output>°C
</p>
</div>

<div id="Description">
<p style="font-size:18px; color:white; text-shadow:0 0 1px black;">
	<output id="text"></output>
</p>
</div>
<div id="icon0">
</div>
<br>

<div id="container2">
</div>
<div id="GeneralDescription">
<h2 style="font-size:18px; color:white; text-shadow:0 0 1px black;">Precipitation</h2>
</div>
<div id="raincloud">
<a href= "https://pixabay.com/de/" target="_blank"><img src="images/prec.gif" alt="Cloud" width="80px"></a>
</div>
<div id="DailyWeather">
<p style="font-size:14px; color:white; text-shadow:0 0 1px black;"> 
	Weather today:
	<br>
	<output id="textfor"></output>
</p>
</div>
<div id="DailyWeatherIcon">
	<output id="iconfor"></output>
</div>
<div id="Humidity">
<p style="font-size:14px; color:white; text-shadow:0 0 1px black;"> 
	Humidity:
	<output id="humidityvalue"></output>
	%
	<br> Visibility:
	<output id="visibility"></output>
	km
</p>
<table id="cloudcover" style="font-size:12px; color:white; text-shadow:0 0 1px black;">
	<tr>
		<th style="border:1px solid;">
			Time:
		</th>
		<th style="border:1px solid;">
			<output id="dt0"></output>
		</th>
		<th style="border:1px solid;">
			<output id="dt3"></output>
		</th>
		<th style="border:1px solid;">
			<output id="dt6"></output>
		</th>
		<th style="border:1px solid;">
			<output id="dt9"></output>
		</th>
		<th style="border:1px solid;">
			<output id="dt12"></output>
		</th>
		<th style="border:1px solid;">
			<output id="dt15"></output>
		</th>
		<th style="border:1px solid;">
			<output id="dt18"></output>
		</th>
		<th style="border:1px solid;">
			<output id="dt21"></output>
		</th>
	</tr>
	<tr>
		<td style="border:1px solid;">
			Cloud cover:
		</td>
		<td style="border:1px solid;">
			<output id="clouds0"></output>%
		</td>
		<td style="border:1px solid;">
			<output id="clouds3"></output>%
		</td>
		<td style="border:1px solid;">
			<output id="clouds6"></output>%
		</td>
		<td style="border:1px solid;">
			<output id="clouds9"></output>%
		</td>
		<td style="border:1px solid;">
			<output id="clouds12"></output>%
		</td>
		<td style="border:1px solid;">
			<output id="clouds15"></output>%
		</td>
		<td style="border:1px solid;">
			<output id="clouds18"></output>%
		</td>
		<td style="border:1px solid;">
			<output id="clouds21"></output>%
		</td>		
	</tr>
	<tr>
		<td style="border:1px solid;">
			Precipitation (mm):
		</td>
		<td style="border:1px solid;">
			<output id="prec0"></output>
		</td>
		<td style="border:1px solid;">
			<output id="prec3"></output>
		</td>
		<td style="border:1px solid;">
			<output id="prec6"></output>
		</td>
		<td style="border:1px solid;">
			<output id="prec9"></output>
		</td>
		<td style="border:1px solid;">
			<output id="prec12"></output>
		</td>
		<td style="border:1px solid;">
			<output id="prec15"></output>
		</td>
		<td style="border:1px solid;">
			<output id="prec18"></output>
		</td>
		<td style="border:1px solid;">
			<output id="prec21"></output>
		</td>		
	</tr>
</table>
</div>

<div id="container3">
</div>
<div id="SunDescription">
<h2 style="font-size:18px; color:white; text-shadow:0 0 1px black;">Sun</h2>
</div>
<div id="Sunpic">
<a href= "https://pixabay.com/de/" target="_blank"><img src="images/sun.gif" alt="Sun" width="100px"></a>
</div>
<div id="Sun">
<p style="font-size:14px; color:white; text-shadow:0 0 1px black;"> Sunrise:
	<output id="sunrise"></output>
	<br> Sunset:
	<output id="sunset"></output>
</p>
</div>
<div id="Sunshine">
<p style="font-size:14px; color:white; text-shadow:0 0 1px black;"> Sunangle:
	<output id="sunangle"></output>°
</p>
</div>
<div id="angle">
<a href= "https://pixabay.com/de/" target="_blank"><canvas id="myCanvas" width="100" height="100" style="border-bottom:1px solid black;background:url('images/sunearth.jpg');"></a>
</div>

<div id="container4">
</div>
<div id="ForecastDescription">
<h2 style="font-size:18px; color:white; text-shadow:0 0 1px black;">Forecasts</h2>
</div>
<div id="Forecasts">
<table style="font-size:14px; color:white; text-shadow:0 0 1px black;">
	<tr>
		<th>
		</th>	
		<th>
		</th>
		<th>
		</th>
		<th>
		Description
		</th>
		<th>
		Highest
		</th>
		<th>
		Lowest
		</th>
	</tr>
	
	<tr>
		<td>
		<output id="day1"></output>
		</td>
		<td>
		<output id="date1"></output>
		</td>
		<td>
		<output id="icon1"></output>
		</td>
		<td>
		<output id="description1"></output>
		</td>
		<td>
		<output id="high1"></output>
		°C
		</td>
		<td>
		<output id="low1"></output>
		°C
		</td>
	</tr>
	<tr>
		<td>
		<output id="day2"></output>
		</td>
		<td>
		<output id="date2"></output>
		</td>
		<td>
		<output id="icon2"></output>
		</td>
		<td>
		<output id="description2"></output>
		</td>
		<td>
		<output id="high2"></output>
		°C
		</td>
		<td>
		<output id="low2"></output>
		°C
		</td>
	</tr>
	<tr>
		<td>
		<output id="day3"></output>
		</td>
		<td>
		<output id="date3"></output>
		</td>
		<td>
		<output id="icon3"></output>
		</td>
		<td>
		<output id="description3"></output>
		</td>
		<td>
		<output id="high3"></output>
		°C
		</td>
		<td>
		<output id="low3"></output>
		°C
		</td>
		<td>
	</tr>
	<tr>
		<td>
		<output id="day4"></output>
		</td>
		<td>
		<output id="date4"></output>
		</td>
		<td>
		<output id="icon4"></output>
		</td>
		<td>
		<output id="description4"></output>
		</td>
		<td>
		<output id="high4"></output>
		°C
		</td>
		<td>
		<output id="low4"></output>
		°C
		</td>
	</tr>
	<tr>
		<td>
		<output id="day5"></output>
		</td>
		<td>
		<output id="date5"></output>
		</td>
		<td>
		<output id="icon5"></output>
		</td>
		<td>
		<output id="description5"></output>
		</td>
		<td>
		<output id="high5"></output>
		°C
		</td>
		<td>
		<output id="low5"></output>
		°C
		</td>
	</tr>
	<tr>
		<td>
		<output id="day6"></output>
		</td>
		<td>
		<output id="date6"></output>
		</td>
		<td>
		<output id="icon6"></output>
		</td>
		<td>
		<output id="description6"></output>
		</td>
		<td>
		<output id="high6"></output>
		°C
		</td>
		<td>
		<output id="low6"></output>
		°C
		</td>
	</tr>
	<tr>
		<td>
		<output id="day7"></output>
		</td>
		<td>
		<output id="date7"></output>
		</td>
		<td>
		<output id="icon7"></output>
		</td>
		<td>
		<output id="description7"></output>
		</td>
		<td>
		<output id="high7"></output>
		°C
		</td>
		<td>
		<output id="low7"></output>
		°C
		</td>
	</tr>
	<tr>
		<td>
		<output id="day8"></output>
		</td>
		<td>
		<output id="date8"></output>
		</td>
		<td>
		<output id="icon8"></output>
		</td>
		<td>
		<output id="description8"></output>
		</td>
		<td>
		<output id="high8"></output>
		°C
		</td>
		<td>
		<output id="low8"></output>
		°C
		</td>
	</tr>
	<tr>
		<td>
		<output id="day9"></output>
		</td>
		<td>
		<output id="date9"></output>
		</td>
		<td>
		<output id="icon9"></output>
		</td>
		<td>
		<output id="description9"></output>
		</td>
		<td>
		<output id="high9"></output>
		°C
		</td>
		<td>
		<output id="low9"></output>
		°C
		</td>
	</tr>
</table>
</div>

<!--#######################################-->
<!-- Function scripts -->

<!--Get Marker location-->
<script type="text/javascript" src="scripts/Marker.js"></script>

<!--Get GPS location-->
<script type="text/javascript" src="scripts/GPS.js"></script>

<!-- Get weather data from YAHOO -->
<script type="text/javascript" src="scripts/CallbackYahoo.js"></script>

<!-- Get weather from Open Weather Map -->
<script type="text/javascript" src="scripts/CallbackOpenWeatherMap.js"></script>


<script charset="UTF-8">
	<!-- write wanted longitude and latitude from PHP in a variable  -->
	var lat = <?php echo  json_encode($_POST["coordlat"], JSON_HEX_TAG); ?>;
	var lon = <?php echo  json_encode($_POST["coordlon"], JSON_HEX_TAG); ?>;
	
	try {
			if (lat == "" || lon == "") throw "No GPS signal or marker position was found. Please try it again.";
		}
	catch (err) {
			alert(err);
			window.location.href = "DefaultSbg.html";
		}
	 
	var link = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text='("+lat+","+lon+")') and u ='c'&format=json&callback=callbackFunction";
	document.write('\x3Cscript type="text/javascript" src="' + link + '">\x3C/script>');

	<!-- URL to get weather data from OpenWeatherMap -->
	var api = "57873a5b79ba8eddcfa47153b6663e69";
	var link3 = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&APPID="+api+"&callback=openWeather";
	document.write('\x3Cscript type="text/javascript" src="' + link3 + '">\x3C/script>');
</script>

<script charset="UTF-8">
	<!-- write wanted city from PHP in a variable  -->
	var city = <?php echo  json_encode($_POST["city"], JSON_HEX_TAG); ?>;

	<!-- error function if city input is empty -->
	try {
			if (city == "") throw "This city does not exist. Please try it again.";
		}
	catch (err) {
			alert(err);
			window.location.href = "DefaultSbg.html";
		}
		
	<!-- URL to get weather data from OpenWeatherMap -->
	var api = "57873a5b79ba8eddcfa47153b6663e69";
	var link3 = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&APPID="+api+"&callback=openWeather";
	document.write('\x3Cscript type="text/javascript" src="' + link3 + '">\x3C/script>');
	  
	<!-- URL to get weather data from YAHOO -->
	var link = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+"')and u='c'&format=json&callback=callbackFunction";
	document.write('\x3Cscript type="text/javascript" src="' + link + '">\x3C/script>');
</script>
 


<!-- Sunangle -->
	<script type="text/javascript" src="scripts/SunAngle.js"></script>


</html>
</body>