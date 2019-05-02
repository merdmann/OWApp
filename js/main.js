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

    /* start and pick wht is requested on the screen */
    function main(data) {
        const pageTitle = document.title;
        console.log("main :" + pageTitle);
        const _search_text_ = document.getElementById("search-text");
        const _sky_ = document.getElementById("sky");
        const _btn_find_ = document.getElementById("btn-find");

        fetchData("http://api.openweathermap.org/data/2.5/forecast?id="+_search_text_.value);
        // install the search-text handler
        _search_text_.addEventListener("change", function () {
            id = Search( _search_text_.value);
            fetchData("http://api.openweathermap.org/data/2.5/forecast?id=" + Search(_search_text_.value));
        });
        // the Find ! hndler
        _btn_find_.addEventListener("click", function() {
            let id = Search( _search_text_.value);
            fetchData("http://api.openweathermap.org/data/2.5/forecast?id=" + Search(_search_text_.value) );
        }); 
    } /* main */

    function ToC(x) {
    	return (x-K).toFixed(2);
    }

    function summary(item) {
    	let result = "png/010-celsius.png";
 
    	result = item.weather[0].main=="Rain" ? "png/001-rain.png" : result;

    	return result;
    }


    // do the per page rendering of the received data
    function ProcessAndRender(data) {
        console.log("ProcessAndRender");
        console.log(data);
        let prediction = data.list;

        let table = `   `;

        if( prediction != null ) 
            prediction.forEach( function(item){
        	    table += `<tr><td>${item.dt_txt.split(" ")[0]}</td><td>${" " + ToC(item.main.temp)}<td><img class="myIcons" src=${ "./img/icons/" + summary(item)}></td>
      		       `
       		}) 

        const _sky_ = document.getElementById("sky");
        let info = `<div class="card" style="width: 18rem">
                     <img class="card-img-top" src=${ "./img/icons/" + summary(prediction[0])}>
                       <div class="card-body">
                       <p class="card-text">${data.city.name}</p>
                       ${ ToC(data.list[0].main.temp_min)}
                       <table>
                       ${table}
                       </table>
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
                return response.json()
            })
            .then(function (myJson) {
                ProcessAndRender(myJson);
            })
            .catch(err => console.log(err))
    }

    main();
}) // DOMContentLoaded handler
