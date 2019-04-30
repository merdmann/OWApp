'use strict'
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")
    const MS = 1000
    const MIN = 60;
    let  id;
    const K = 273.15;

    /* search by name and return the id */
    function Search( name) {
    	let result;

		Cities.forEach( function(city) {
			result = city.name==name ? city.id : null;
		});

		return result;
	}

    function main(data) {
        const pageTitle = document.title;
        console.log("main :" + pageTitle);

        fetchData("http://api.openweathermap.org/data/2.5/weather?q=Berlin");

        // install the search-text handler
        const _search_text_ = document.getElementById("search-text");
        _search_text_.addEventListener("change", function () {
            id = Search( _search_text_.value);
        })
    }
        /* UPDATE every 10 mins.
        window.setTimeout(function () {
        	fetchData(fetchData("http://api.openweathermap.org/data/2.5/weather?q=Berlin");)
        }, MS * NIN * 10 );

    } /* main */


    // do the per page rendering of the received data
    function ProcessAndRender(data) {
        console.log("ProcessAndRender");
        console.log(data);

        const _span_info_ = document.getElementById("span-info");
        let info = ` <strong>${data.name} ${data.weather[0].main}</strong><br> 
                     <strong>${(data.main.temp-K).toFixed(2)} C</strong>`

        _span_info_.innerHTML = info;
        const _sky_ = document.getElementById("sky");
        sky.classList.add(data.weather[0].main)  

    } /* ProcessAndRender */

    // fetches data from the  server
    function fetchData(url) {
        const key = "6f88b36c3ba927bbc4676605fc738ae3";
        const myurl = url + "&appid="+key;
        console.log(myurl); 
        console.log("fetching" + myurl);
        fetch(url + "&appid=" + key)
            .then(function (response) {
                document.body.style.cursor = 'wait'
                console.log(response)
                return response.json()
            })
            .then(function (myJson) {
                document.body.style.cursor = 'auto'
                ProcessAndRender(myJson);
            })
            .catch(err => console.log(err))
    }

    main();
}) // DOMContentLoaded handler

/*
 * remove a card from the local storage (ListOfInt) and the screen
 */
