/*################## Calculation of the sun angle - Anna-Maria Cavallaro April 2018 #################*/

  /*calculation of the sun angle*/
	var phi = latsun;
	var str = lastBuildDate;
	var dayofweek = str.substring(0,3);
	var strDay = str.substring(5,7);
	var strMonth = str.substring(8,11);
	var strYear = str.substring(12,16);
	var strHour = str.substring (17,19);
	var strMinute = str.substring (20,22);
	var strDaytime = str.substring (23,25);
	if (strDaytime == "PM" && strHour < 12 && strHour > 0) {strHour = parseInt(strHour) + 12;}
  
	/*get date*/
	var strDate = strDay + " " + strMonth + " " + strYear + " " + strHour + ":" + strMinute;

	var date = new Date(strDate);


	/*hour angle*/
	var hour = date.getHours();
	var minute = date.getMinutes();
	var minutes = (hour * 60 + minute);
	var hourangle = (minutes - 720) * 0.25;
	

	/*day of the year*/
	var start = new Date(date.getFullYear(), 0, 0);
	var last = new Date(date.getFullYear(), 11, 31)
	var diff = date-start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	
	/*var days = date.getFullYear()*/	
	var dekl = 23.4*Math.sin(((2*Math.PI)/360)*(360*(284+day)/365));

	/*sun height*/
	var sinh = Math.cos(((2*Math.PI)/360)*dekl) * Math.cos(((2*Math.PI)/360)*hourangle) * Math.cos(((2*Math.PI)/360)*phi) + Math.sin(((2*Math.PI)/360)*dekl) * Math.sin(((2*Math.PI)/360)*phi);
	var h =(360 /(2* Math.PI))*Math.asin(sinh);
	alert (strDate);
	if (h < 0) {h = 0;}
	var num = parseFloat(Math.round(h * 100) / 100).toFixed(2);
	document.getElementById("sunangle").value = num;

	/*draw angle*/
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	var r = 100;
	var theta = h * -1;
	ctx.moveTo(100, 100);
	ctx.lineTo(0, 100);
	if ( h > 0){
	ctx.lineTo(0 + r * Math.cos(Math.PI * theta / 180.0),100 + r * Math.sin(Math.PI * theta / 180.0));}
  
	ctx.stroke();
	
	if (h == 0){
	document.body.style.backgroundImage = "url('background/moon.jpg')";}
