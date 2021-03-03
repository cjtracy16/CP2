
//API id
let idEdamam = "&app_id=5d24488a";

//API Keys
let keyEdamam = "&app_key=174f7baadbf4fc84b1a7b7cf73ba7666";
let keyCalendar = "?api_key=7604e7a55b2d34db7fbdcbdbc25fc170b77c43b6";


//Host
let hostBored = "http://www.boredapi.com/api/activity/";
let hostEdamam = "https://api.edamam.com/search";
let hostCalendar = "https://calendarific.com/api/v2/";

//Paths
let pathCalendarHolidays = "holidays";
let pathCalendarCountries = "countries";

//Parameters - default
let prmCountries = "&country=US";
let prmYear = "&year=";
let prmMonth = "&month=";
let prmQuery = "?q=";
let prmEdamam = "";

//Begin HTML edit
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    //prevent empty submit
    event.preventDefault();

    //Get userInput
    const value = encodeURIComponent(document.getElementById("weatherInput").value);
    if (value === "") {
        return;
    }


    //EDAMAM
    prmQuery += value;
    const urlEdamam = hostEdamam + prmQuery + value + idEdamam + keyEdamam + prmEdamam;



//    //CALENDAR

//    let userYear = "2021"
//    let userMonth = 1;

//    prmMonth += userMonth.toString(); //default FIXME if statement
//    prmMonth += "," + (userMonth + 1).toString();
//    prmYear += "2021"; //default FIXME if statement
//    const urlCalendar = hostCalendar + pathCalendarHolidays + keyCalendar
//        + prmCountries + prmYear;
//        // + prmMonth;

    console.log(urlEdamam);
    fetch(urlEdamam)
        .then(function(response) {
            return response.json();
        }).then(function(json) {

            console.log(json);
                         // document.getElementById("weatherResults").innerHTML = results;
        })
        .catch((error) => {console.error(error);} );









//    // Fetch forecast
//    const url = host + imagePath + input /*+ parameters*/ + subscriptionKey;


//    fetch(url2)
//        .then(function(response) {
//            return response.json();
//        }).then(function(json) {

//            console.log(json);

//            //formatting forecast
//            let forecast = "";
//            forecast += "</div>";

//            document.getElementById("forecastResults").innerHTML = forecast;

//        })
//        .catch((error) => {console.error(error);} );









});

