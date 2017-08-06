document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");


    var body = document.querySelector("body");

    var weatherIco = document.querySelector("#weatherIco");
    var clouds = document.querySelector(".clouds");
    var rainbows = document.querySelector(".rainbows");
    var cloudFlow = document.querySelectorAll(".cloudFlow");
    var rainS = document.querySelector(".rains");
    var mariginLeft = 0;
    console.log(rainS);

    var input = document.querySelector("#input");
    //var inputValue = input.value;
    var searchButton = document.getElementById('searchButton');
    var searchResults = document.querySelector('.searchResults');
    var searchResultsList = document.querySelector('.searchResultsList');
    var ul = document.querySelector("ul");

    var li = document.createElement("li");
    var buttonResults = document.createElement("button");
    var l = "";
    var currentOpacity = 1;
    var sumOfCloudsOpacity = 0;

    console.log(searchButton);


    for (var i = 0; i < cloudFlow.length; i++) {

          cloudFlow[i].addEventListener("click", function(event) {
          var currentOpacity = this.style.opacity;
          currentOpacity -= 0.4;
          if (currentOpacity < 0) {
              currentOpacity = 0;
          }
          this.style.opacity = currentOpacity.toString();
          cloudOpacityCounter ();
        });

    }





function cloudOpacityCounter () {
  sumOfCloudsOpacity = 0;
  for (var i = 0; i < cloudFlow.length; i++) {

      sumOfCloudsOpacity += Number(cloudFlow[i].style.opacity);

    }
    console.log("Suma opacity wynosi "+sumOfCloudsOpacity );
    if (sumOfCloudsOpacity <= 0) {
      alert("Zniszczyles chmury!!!");
    }
}



function weatherResults (data) {


  var temp = data.current_observation.temp_c;
  var weather = data.current_observation.weather;
  var rainKm = data.current_observation.wind_gust_kph;


  output = document.querySelector("#output");
  output.innerHTML = "Temperature: " + temp + " &#176; C <br>" + weather;

  for (var i = 0; i < cloudFlow.length; i++) {
      cloudFlow[i].style.opacity = 1;
    }

  if (weather.indexOf("Rain") >= 0) {
      body.setAttribute("class", "rain");
      clouds.style.display = 'none';
      //weatherIco.setAttribute("class", "cloud");
      rainS.style.display = 'block';



      for (var i = 0; i < 20; i++) {
        mariginLeft +=5;
        console.log(mariginLeft);

        var rainSmake = document.createElement("div");
        rainS.appendChild(rainSmake);
        rainSmake.setAttribute("class", "rains");
        var rainPosition = document.createElement("div");
        rainSmake.appendChild(rainPosition);
        rainPosition.setAttribute("class", "rainPosition");



        var rainDrop= document.createElement("div");
        rainSmake.appendChild(rainDrop);
        rainDrop.setAttribute("class", "rainDrop");
        rainDrop.style.marginLeft = String(mariginLeft)+"px";
        rainDrop.style.animationDelay = "-"+String(i)+"s";

        var rainDropSlow = document.createElement("div");
        rainSmake.appendChild(rainDropSlow);
        rainDropSlow.setAttribute("class", "rainDropSlow");
        rainDropSlow.style.marginLeft = String(mariginLeft)+"px";
      }







  } else if (weather.includes("Clou") == true || weather.includes("Overcast") == true  ) { //zamiast indexOf porownuje za pmoca includes bo w tym json odmieniają slowo cloud
      body.setAttribute("class", "rain");
      //weatherIco.setAttribute("class", "cloud");
      clouds.style.display = 'block';
      rainS.style.display = 'none';
      //weatherIco.classList.add("drop");
      //weatherIco.className += " drop";

  } else if (weather.indexOf("Clear") >= 0) {
      //body.setAttribute("class", "clear");
      body.setAttribute("class", "clear");
      weatherIco.setAttribute("class", "sun");
      clouds.style.display = "none";
      rainS.style.display = 'none';
  }
}





    searchButton.addEventListener("click", function(event) {
      rainbows.style.display = 'none';

        input = document.querySelector("#input");
        var inputValue = input.value;

        ul = document.querySelector("ul");
        if (ul != null) {
            console.log("nie dziala?")
            ul.parentNode.removeChild(ul);
        }


        /*
                function getJson() {

                    $.getJSON("http://api.wunderground.com/api/55b1f2cf5780cb8a/conditions/q//" + inputValue + ".json", function(data) {

                        console.log(data);

                    });
                };
        */
      var  $j = jQuery.noConflict();

        $j.getJSON("https://api.wunderground.com/api/55b1f2cf5780cb8a/conditions/q//" + inputValue + ".json", function(data) {

            //console.log(data);

            if (typeof data.response.results === 'undefined') {
                weatherIco.classList = "";

                weatherResults(data);

            }

            else if (data.response.results.length > 1) {
                //console.log("Więcej niż jedno miasto z tą nazwą")
                weatherIco.classList = "";


                output = document.querySelector("#output");
                output.innerText = "There are several cities with this name:";
                var ul = document.createElement("ul");
                searchResultsList.appendChild(ul);



                for (var i = 0; i < data.response.results.length; i++) {
                    console.log(data.response.results[i].city + " - " + data.response.results[i].country_name + " - " + data.response.results[i].state);
                    li = document.createElement("li");
                    buttonResults = document.createElement("button");
                    ul.appendChild(li);
                    ul.appendChild(buttonResults);
                    buttonResults.innerHTML = "check weather";
                    buttonResults.classList = "buttonResults";
                    li.innerText = data.response.results[i].city + " - " + data.response.results[i].country_name + " - " + data.response.results[i].state;
                    li.dataset.manyResultLink = data.response.results[i].l + ".json";

                }


                buttonResults = document.querySelectorAll(".buttonResults");

                for (var i = 0; i < data.response.results.length; i++) {
                    //console.log("tatat");


                    buttonResults[i].addEventListener("click", function(event) {
                        buttonResults = document.querySelectorAll(".buttonResults");
                        //console.log(this.previousElementSibling.dataset.manyResultLink);


                        $j.getJSON("https://api.wunderground.com/api/55b1f2cf5780cb8a/conditions/" + this.previousElementSibling.dataset.manyResultLink, function(data) {

                          weatherResults (data);

                        });

                    });
                }
            }

        });

    });
      });









    /*

    //<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>

    jQuery(document).ready(function($) {
      $.ajax({
      url : "http://api.wunderground.com/api/55b1f2cf5780cb8a/geolookup/conditions/q/IA/Cedar_Rapids.json",
      dataType : "jsonp",
      success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      console.log("Current temperature in " + location + " is: " + temp_f);
      }
      });
    });

    */
