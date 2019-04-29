'use strict'
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")

    function main(data) {
        const pageTitle = document.title;
        console.log("main :" + pageTitle);

        fetchData("http://api.openweathermap.org/data/2.5/weather/q=Berlin");

        // install the search-text handler
        const _search_text_ = document.getElementById("search-text");
        _search_text_.addEventListener("change", function () {
        	Cities.forEach( function(city) {
        		console.log(city); 
        	})
            console.log(_search_text_.value);
        })

    } /* main */


    // do the per page rendering of the received data
    function ProcessAndRender(data) {
        console.log("ProcessAndRender");
        console.log(data);

    } /* ProcessAndRender */

    // fetches data from the  server
    function fetchData(url) {
        const key = "6f88b36c3ba927bbc4676605fc738ae3"
        const myurl = url + "&appid="+key
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
