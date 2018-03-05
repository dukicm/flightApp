(function (){
/*geolocation*/
var apiGeolocationSuccess = function(position) {
	alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};

var tryAPIGeolocation = function() {
	jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
		apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
  });
};

var browserGeolocationSuccess = function(position) {
	alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      alert("Browser geolocation error !\n\nTimeout.");
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        tryAPIGeolocation();
      }
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Browser geolocation error !\n\nPosition unavailable.");
      break;
  }
};

var tryGeolocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    	browserGeolocationSuccess,
      browserGeolocationFail,
      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
  }
};

tryGeolocation();
/*geolocation*/

var currentLatitude;
var currentLongitude;
var container = document.getElementById("container");
var container2 = document.getElementById("container2");
var tableBody = document.getElementById("tablebody");

function getLocation(position) {
	currentLatitude = position.coords.latitude;
	currentLongitude = position.coords.longitude;
	
	$.ajax({
	    url: 'http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat='+currentLatitude+'&lng='+currentLongitude+'&fDstL=0&fDstU=500',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    type: "GET", /* or type:"GET" or type:"PUT" */
	    dataType: "jsonp",
	    data: {
	    },
	    success: function (result) {
	    		/*prodji kroz listu aviona (acList) i prikaži mi Latitude i Longitude*/
	    		for (var i = 0; i < result.acList.length; i++) {
	    			var currentAirplaneLat = result.acList[i].Lat;
	    			var currentAirplaneLong = result.acList[i].Long;
	    			var airPlaneCou = result.acList[i].Cou;
	    			var airPlaneFrom = result.acList[i].From;
	    			var airPlaneTo = result.acList[i].To;
	    			var airPlaneAlt = result.acList[i].Alt;
	    			var airPlanetAltArrey = [];

	    			airPlanetAltArrey.sort(function(a, b){return a - b});

	    			airPlanetAltArrey.push(airPlaneAlt);
	    			/*ubaci svaki altitud u arrey*/


	    		
	    			console.log(airPlanetAltArrey);
	    			/*console.log(result.acList[i]);*/

	    			/*container.innerHTML += "<ul><li>"+airPlaneFrom+"</li></ul>";*/
	    			/*container2.innerHTML += "<ul><li>"+airPlaneTo+"</li></ul>";*/

	    			tableBody.innerHTML += '<tr><td>'+airPlanetAltArrey+'</td><td>'+airPlaneTo+'</td><td>'+airPlaneCou+'</td></tr>';
	    			/*dodaj u tabelu novi red i podatke. U table data dodaj variable.*/

	    			/*console.log(currentLatitude);*/
	    			/*console.log(result.acList[i]);*/
	    			/*console.log(result.acList[i].Long);*/
	    		}

	    },
	    error: function () {
	        console.log("error");
	    }
	});
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(getLocation);
}
/*geolocation*/






}());