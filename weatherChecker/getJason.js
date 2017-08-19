document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    let body = document.querySelector("body");

    let weatherIco = document.querySelector("#weatherIco");
    let clouds = document.querySelector(".clouds");
    let gamePopup = document.createElement("div");
    let gamePopupTimer = document.createElement("div");
    let gameSpace = document.querySelector(".gameSpace");
    let badgeClouds = document.querySelector(".badgeClouds");
    let badgeCloudsContainer = document.querySelector(".badgeCloudsContainer");






    let rainbows = document.querySelector(".rainbows");
    let cloudFlow = document.querySelectorAll(".cloudFlow");
    let rainS = document.querySelector(".rains");
    let mariginLeft = 0;
    console.log(rainS);

    let input = document.querySelector("#input");
    let inputValue = input.value;
    let bckGradien = document.querySelector('.bckGradien');
    let searchButton = document.getElementById('searchButton');
    let searchMenu = document.querySelector('.searchMenu');
    let searchResults = document.querySelector('.searchResults');

    let searchResultsList = document.querySelector('.searchResultsList');
    let ul = document.querySelector("ul");

    let li = document.createElement("li");
    let buttonResults = document.createElement("button");
    let l = "";
    let currentOpacity = 1;
    let sumOfCloudsOpacity = 0;
    let clickCount = 0;

//na starcie strony uwstawiam cookies jezeli jest wczesniej pobrane
    var cookies = document.cookie.split("; ")
    if (cookies[0].split("=")[1] != undefined) {
      input.value = cookies[0].split("=")[1];
    }



// funkcja pobierajaca cookies
        function setCookie(name, val, days) {
        if (days) {
            var data = new Date();
            data.setTime(data.getTime() + (days * 24*60*60*1000));
            var expires = "; expires="+data.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name + "=" + val + expires + "; path=/";
    }






    function clickClouds() {

        for (let i = 0; i < cloudFlow.length; i++) {

            cloudFlow[i].addEventListener("click", function(event) {

                let currentOpacity = this.style.opacity;
                currentOpacity -= 0.4;  //za kazdym klikiem w chmurke odejmuej 0,4 opacity od opacity: 1
                clickCount += 1;  //licze kliki tzn punkty w grze
                if (currentOpacity < 0) {  //nie chce miec ujemenego opacity (bo potem to zliczam by sprawdzic czy wszystkie chmurki sa odklikane) wiec jezli opacity jest na minusie to przyrownuje je do zera
                    currentOpacity = 0;

                    //this.remove();   - jak usuwam to musze je jeszce dodać w js bo sa obecnei tylko w html. najlepiej je tworzyc gdy sa chmury
                }
                this.style.opacity = currentOpacity.toString();
                cloudOpacityCounter();
                countDisplay(clickCount);

            });

        }
    }


    function countDisplay(count) {
        gamePopup.innerHTML = "Score: 0 ";
        gamePopup.innerHTML = "Score: " + count;

    }




    function cloudOpacityCounter() {
        sumOfCloudsOpacity = 0;
        for (let i = 0; i < cloudFlow.length; i++) {
            sumOfCloudsOpacity += Number(cloudFlow[i].style.opacity);
        }
        console.log("Suma opacity wynosi " + sumOfCloudsOpacity);
        if (sumOfCloudsOpacity <= 0) {
            alert("You're now officially a Cloud Destroyer, you little exterminator you!");
          //  clouds.style.pointerEvents = "auto" // jeżeli ktoś znieszczyl wszystkie chmury to odblokowuje mozliwosc klikniecia bo wtedy moze kliknac by poszerowac odznakę
            badgeClouds.style.display = 'block';
            badgeCloudsContainer.style.display = 'block';


        }
    }




    function weatherResults(data) {

        let temp = data.current_observation.temp_c;
        let weather = data.current_observation.weather;
        let rainKm = data.current_observation.wind_gust_kph;
        let predictionUrl = data.current_observation.forecast_url;
        let predictionLink  = document.createElement('a');


        output = document.querySelector("#output");



        output.innerHTML = "Temperature: " + temp + " &#176; C <br>" + weather+"<br>" ;
        output.appendChild(predictionLink);

        predictionLink.setAttribute('href',data.current_observation.forecast_url);
          predictionLink.setAttribute('target', '_blank');
        predictionLink.innerHTML = "Check prediction";
        console.log(predictionUrl);


        for (let i = 0; i < cloudFlow.length; i++) {
            cloudFlow[i].style.opacity = 1;
        }

        if (weather.indexOf("Rain") >= 0) {
            body.setAttribute("class", "rain");
            clouds.style.display = 'none';
            //weatherIco.setAttribute("class", "cloud");
            rainS.style.display = 'block';

            for (let i = 0; i < 20; i++) {
                mariginLeft += 5;
                console.log(mariginLeft);

                let rainSmake = document.createElement("div");
                rainS.appendChild(rainSmake);
                rainSmake.setAttribute("class", "rains");
                let rainPosition = document.createElement("div");
                rainSmake.appendChild(rainPosition);
                rainPosition.setAttribute("class", "rainPosition");

                let rainDrop = document.createElement("div");
                rainSmake.appendChild(rainDrop);
                rainDrop.setAttribute("class", "rainDrop");
                rainDrop.style.marginLeft = String(mariginLeft) + "px";
                rainDrop.style.animationDelay = "-" + String(i) + "s";

                let rainDropSlow = document.createElement("div");
                rainSmake.appendChild(rainDropSlow);
                rainDropSlow.setAttribute("class", "rainDropSlow");
                rainDropSlow.style.marginLeft = String(mariginLeft) + "px";
            }

        } else if (weather.includes("Clou") == true || weather.includes("Overcast") == true) { //zamiast indexOf porownuje za pmoca includes bo w tym json odmieniają slowo cloud
            body.setAttribute("class", "rain");
            //weatherIco.setAttribute("class", "cloud");
            clouds.style.display = 'block';
            //clouds.style.overflow = 'hidden';
            rainS.style.display = 'none';
            gamePopup.remove();
            gamePopupTimer.remove();
            if (clickCount < 1) {   //sprawie ze gra pojawia sie tylko raz - mam problem z zerowaniem wyniku gry wiec ograniczylem gre do 1 razowgo pojawienia sie
              hiddenGame();
            }


        } else if (weather.indexOf("Clear") >= 0) {
            //body.setAttribute("class", "clear");
            body.setAttribute("class", "clear");
            weatherIco.setAttribute("class", "sun");
            clouds.style.display = "none";
            rainS.style.display = 'none';
        }
    }



    function hiddenGame(clicks) {

        clouds.style.pointerEvents = "none"; //blokuje chmury przed klikaniem na czas odliczania
        let blockClickElement = document.createElement("div");
        gameSpace.appendChild(gamePopup);
        gameSpace.appendChild(gamePopupTimer);
        body.appendChild(blockClickElement);

        gamePopup.classList = "gamePopup";
        gamePopupTimer.classList = "gamePopup";
        blockClickElement.classList = "blockClickOpacity"
        let countdown = 6;
        let timeCount = 16;


      setTimeout(function() {
            gamePopup.innerText = "You have unlocked a secret game!"
        }, 1000);


        setTimeout(function() {

            let countDownCount = setInterval(function() {
                countdown -= 1;

                gamePopup.innerHTML = "Try to clear the sky by clicking out all the clouds in<span class='gameCountdown'> "+countdown+"</span> seconds";

                gamePopupTimer.innerText = "Time left: 15";

                if (countdown === 0) {
                    clearInterval(countDownCount);
                    gamePopup.style.color = "red";
                    gamePopup.innerText = "START!!!";
                    clouds.style.pointerEvents = "auto"

                    clickClouds();
                    countDisplay();

                    let countTime = setInterval(function() {
                        timeCount -= 1;
                        gamePopupTimer.innerText = "Time left: " + timeCount;

                        if (timeCount === 0) {
                            clearInterval(countTime);
                            clouds.style.pointerEvents = "none";

                            setTimeout(function() { // uwuwam opo up z wynikiem wyniki po 6 sekundach
                                gamePopup.remove();
                                gamePopupTimer.remove();
                            }, 6000);

                        }

                    }, 1000);

                    //setTimeout(function(){ gamePopup.style.display = "none"; clouds.style.pointerEvents = "auto";  }, 1000);

                }

            }, 1000);

        }, 6000);

    }


    // wywoluje fb share na click - funkcja pobierajace dane z fb id jest w <script> w html
    badgeClouds.addEventListener("click", function(event) {
            FB.ui({
      method: 'share',
      display: 'iframe',
      href: 'https://nowackikrz.github.io/weatherChecker/images/badge.png',
      redirect_uri:'https://nowackikrz.github.io/weatherChecker/index.html',





    }, function(response){});

    });



    searchButton.addEventListener("click", function(event) {
        badgeClouds.style.display = 'none'
        rainbows.remove();

        input = document.querySelector("#input");
        let inputValue = input.value;

        setCookie("cityCookie", input.value, 7)  // podczas wyszukiwania pobieram cookie tzn wartosc inputa

        ul = document.querySelector("ul");
        if (ul != null) {
            console.log("nie dziala?")
            ul.parentNode.removeChild(ul);
        }

        let $j = jQuery.noConflict();

        $j.getJSON("https://api.wunderground.com/api/55b1f2cf5780cb8a/conditions/q//" + inputValue + ".json", function(data) {

            //console.log(data);

            if (typeof data.response.results === 'undefined') {
                weatherIco.classList = "";

                weatherResults(data);

            } else if (data.response.results.length > 1) {     // gdy jest więcej niz jedno miasto (stacja badawcza) z szukaną nazwą
                //console.log("Więcej niż jedno miasto z tą nazwą")
                weatherIco.classList = "";

                output = document.querySelector("#output");
                output.innerText = "There are research stations with this name:";
                let ul = document.createElement("ul");
                searchResultsList.appendChild(ul);

                for (let i = 0; i < data.response.results.length; i++) {
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

                for (let i = 0; i < data.response.results.length; i++) {

                    buttonResults[i].addEventListener("click", function(event) {
                        buttonResults = document.querySelectorAll(".buttonResults");
                        //console.log(this.previousElementSibling.dataset.manyResultLink);

                        $j.getJSON("https://api.wunderground.com/api/55b1f2cf5780cb8a/conditions/" + this.previousElementSibling.dataset.manyResultLink, function(data) {

                            weatherResults(data);

                        });

                    });
                }
            }

        });

    });
});
