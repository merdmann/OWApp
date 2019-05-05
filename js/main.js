'use strict'
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")
    const MS = 1000
    const MIN = 60;
    let  id = 0;
    const K = 273.15;


    /* search by name returns a result set */
    function Search(name) {
        let result = new Map();
        let countries = [];

        console.log("Search (" +  name + ")");

		Cities.forEach( function(city) {
            if( city.name.toLowerCase().includes(name.toLowerCase())) {
                if(!countries.includes(city.country)) {
                    countries.push(city.country);
                	result.set(city.country, city.id);
                }
            }
		});

		return result;
	}

    /* start and pick wht is requested on the screen */
    function main(data) {
        const pageTitle = document.title;
        console.log("main :" + pageTitle);
        const _search_text_ = document.getElementById("search-text");
        const _sky_ = document.getElementById("sky");
        const _btn_find_ = document.getElementById("btn-find");
        const _bdg_search_size_= document.getElementById("bdg-search-size");
        const _select_ = document.getElementById("select-country");
        let   id = 0;


        _btn_find_.addEventListener("click", function() {
            let resultSet = Search( _search_text_.value);
            _bdg_search_size_.innerHTML=resultSet.size;
            let tmp = `<select id="select-country">`;
            resultSet.forEach( function( item, key, map ) {
                    tmp +=`<option value="${item}">${key}</option>` ;
            })
            tmp += "</select>"
            document.getElementById("country-selector").innerHTML = tmp;

            const _select_ = document.getElementById("select-country");
            _select_.addEventListener( 'click', function() {
               id = _select_.options[_select_.selectedIndex].value;
               console.log(id.value);
               fetchData("http://api.openweathermap.org/data/2.5/forecast?id=" + id);
            });
        });
    } /* main */

    /*
     * Covert kelvin into Celsius
     */
    function ToC(x) {
    	return (x-K).toFixed(0);
    }

    /*
     * This derives the icon to be shown for the specific waether
     */
    function summary(item) {
    	let result = "png/008-weather.png";
    	console.log("summary");
 		console.log( item);

         if( item.main.temp_min < 273) {
            result = "png/046-cold.png"
         }
        else {
    	    result = item.weather[0].main=="Rain" ? "png/002-rain.png" : result;
            result = item.weather[0].description=="broken clouds" ? "png/020-clouds.png" : result;
            result = item.weather[0].description=="few clouds" ? "png/015-cloud.png" : result;
            result = item.weather[0].description=="overcast clouds" ? "png/013-cloudy.png" : result;
            result = item.weather[0].description=="clear sky" ? "png/013-cloudy.png" : result;
        }
    	return result;
    }

    function appendRow( str, row ) {
        let result = str;

        result += `</div><div class="row">`
        for(let i=0; i<row.length; ++i ) {
            console.log(row.length);
            result += `<div class="col-sm-4">
                          ${row[i].trim()}
                       </div>
                       `;
        }
        return result;
    }

    /* a small wraper to inser the summry image */
    function  summaryImage(item) {
        return `<img class="summaryIcons" src=${"./img/icons/" + summary(item)}`;

    } 

    // do the per page rendering of the received data
    function ProcessAndRender(data) {
        console.log("ProcessAndRender");
        console.log(data);
        let todays = data.list[0].weather[0].description;
        const _sky_ = document.getElementById("sky");


//        if( data.cod != 200) {
//        	alert(data.message );
//        }

        // create forecast overview
        let table = ` <table>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Summary</th>
                      <th>Temperature</th>
                    `
        /* running throught the  complete weather prediction */
        data.list.forEach( function( item ){
            console.log(item.dt_txt)  // e.g: 2019-05-07 15:00:0
            let date = item.dt_txt.split(" ")[0];
            let time = item.dt_txt.split(" ")[1];
            let currentDate = date;

            table =  appendRow( table,  
                         [ `${ToC(item.main.temp)}`,
                          `${date} ${time} ${ToC(item.main.temp)}`,
                          `${summaryImage(item)}`] );

           }); // end forEach list item

           table += `</table>`;
           console.log(table);

        let info = `<div class="card">
                    <div class="card-header lead"><h1>${data.city.name} / ${data.city.country}</h1></div>
                      <img class="float-right dialySummary" src=${ "./img/icons/" + summary(data.list[0]) }>
                        <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item lead">${data.city.name} ${data.list[0].weather[0].description}</li>
                            <li class="list-group-item lead">Temperature ${ToC( data.list[0].main.temp_min)} C</li>
                        </ul>
                       ${table}
                     </div>
                     </div>`

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
