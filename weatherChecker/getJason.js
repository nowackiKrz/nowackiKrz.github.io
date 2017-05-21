document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");


    var body = document.querySelector("body");
    var weatherIco = document.querySelector("#weatherIco");
    var clouds = document.querySelector("#clouds");
    var input = document.querySelector("#input");
    //var inputValue = input.value;
    var searchButton = document.getElementById('searchButton');
    var searchResults = document.querySelector('.searchResults');
    var ul = document.querySelector("ul");

    var li = document.createElement("li");
    var buttonResults = document.createElement("button");
    var l = "";

    console.log(searchButton);


function weatherResults (data) {

  var temp = data.current_observation.temp_c;
  var weather = data.current_observation.weather;
  var rainKm = data.current_observation.wind_gust_kph;


  output = document.querySelector("#output");
  output.innerHTML = "Temperature: " + temp + " &#176; C <br>" + weather;

  if (weather.indexOf("Rain") >= 0) {
      body.setAttribute("class", "rain");
      weatherIco.setAttribute("class", "cloud");
  } else if (weather.includes("Clou") == true || weather.includes("Overcast") == true  ) { //zamiast indexOf porownuje za pmoca includes bo w tym json odmieniają slowo cloud
      body.setAttribute("class", "rain");
      weatherIco.setAttribute("class", "cloud");
      clouds.classList.toggle("clouds");
      //weatherIco.classList.add("drop");
      //weatherIco.className += " drop";

  } else if (weather.indexOf("Clear") >= 0) {
      body.setAttribute("class", "clear");
      weatherIco.setAttribute("class", "sun");
  }
}





    searchButton.addEventListener("click", function(event) {

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
      //var  $j = jQuery.noConflict();

        $.getJSON("https://api.wunderground.com/api/55b1f2cf5780cb8a/conditions/q//" + inputValue + ".json", function(data) {

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
                searchResults.appendChild(ul);



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


                        $.getJSON("https://api.wunderground.com/api/55b1f2cf5780cb8a/conditions/" + this.previousElementSibling.dataset.manyResultLink, function(data) {

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
