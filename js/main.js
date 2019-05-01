'use strict'
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")
    const MS = 1000
    const MIN = 60;
    let  id;
    const K = 273.15;

    /* search by name and return the id */
    function Search(name) {
    	let result = null;

        console.log("Search " +  name)

		Cities.forEach( function(city) {
            if( city.name.toLowerCase().includes(name.toLowerCase()))
 			    result = city.id;
		});

        console.log( result );
		return result;
	}

    /* remove all sky styles */
    function clear(classList) {
   

    } /* clear */


    /* start and pick wht is requested on the screen */
    function main(data) {
        const pageTitle = document.title;
        console.log("main :" + pageTitle);
        const _search_text_ = document.getElementById("search-text");
        const _sky_ = document.getElementById("sky");


        fetchData("http://api.openweathermap.org/data/2.5/weather?q="+_search_text_.value);
        // install the search-text handler
        _search_text_.addEventListener("change", function () {
            id = Search( _search_text_.value);
            fetchData("http://api.openweathermap.org/data/2.5/weather?id=" + Search(_search_text_.value));
        });
    } /* main */


    // do the per page rendering of the received data
    function ProcessAndRender(data) {
        console.log("ProcessAndRender");
        console.log(data);

        const _sky_ = document.getElementById("sky");
        let info = ` <div class="card" style="width: 18rem">
                     <img class="card-img-top" src="./icons/${data.weather[0].main.toLowerCase()}.jpg">
                       <div class="card-body">
                       <p class="card-text">${data.name}  ${(data.main.temp-K).toFixed(2)} C</p>
                     </div>
                     </div>
                     </p>`

        _sky_.innerHTML = info;

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
