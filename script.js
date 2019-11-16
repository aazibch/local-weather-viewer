/*jshint browser: true, devel: true, jquery: true*/
$(document).ready(function () {
    var lon,
        lat,
        tempCel,
        tempFah;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            getData();
        });
    } else {
        console.log("Geolocation not supported.");
    }

    function getData() {
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon, function (data) {
            var location = data.name + ", " + data.sys.country,
                statusImage = '<img id="status-image" data-toggle="tooltip" data-placement="right" title="' + 
                data.weather[0].main + '" src="' + 
                data.weather[0].icon + '" alt="' + 
                data.weather[0].main + '">';
            tempCel = Math.floor(data.main.temp);
            tempFah = Math.floor(tempCel * 9 / 5 + 32);

            $("#location").text(location);
            $("#temperature-figure").html(tempCel);
            $("#status").html(statusImage);
            $("#status-image").tooltip();

            $("#status-image").on("error", function () {
                $("#status-image").tooltip("destroy"); 
            });

            setTempSwitch();
        });
    }

    function setTempSwitch () {
        $("#switch").removeClass("hidden");

        $("#fahrenheit").on("click", function () {
            $("#temperature-figure").text(tempFah);
            $(this).addClass("selected");
            $("#celsius").removeClass("selected");
        });

        $("#celsius").on("click", function () {
            $("#temperature-figure").text(tempCel);
            $(this).addClass("selected");
            $("#fahrenheit").removeClass("selected");
        });
    }
});