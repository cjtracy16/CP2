//API id

let idEdamam = "&app_id=5d24488a";

//API Keys
let keyEdamam = "&app_key=174f7baadbf4fc84b1a7b7cf73ba7666";
let keyCalendar = "&api_key=7604e7a55b2d34db7fbdcbdbc25fc170b77c43b6";


//Host
let hostBored = "http://www.boredapi.com/api/activity";
let hostEdamam = "https://api.edamam.com/search";
let hostCalendar = "https://calendarific.com/api/v2/holidays?";
let hostFoodish = "https://foodish-api.herokuapp.com/api/";



//Begin HTML edit
document.getElementById("submitInfo").addEventListener("click", function(event) {
    //prevent empty submit
    event.preventDefault();


    let dateActivity = new Array();
    let imageArray = new Array();
    let holiday = new Array();
    let holidayDate = new Array();
    let results = "";

    //Get Parameters
    let activityType = document.getElementById("selector").value;
    let numParticipants = parseInt(encodeURIComponent(document.getElementById("num").value));
    //let access = document.getElementById("myAccessibility").value;
    //let price = document.getElementById("myPrice").value;
    const eventDate = document.getElementById("birthDate").value;

    if (numParticipants === undefined || isNaN(numParticipants)) {
        return;
    }
    if (!eventDate || eventDate.length === 0 || eventDate === "" || eventDate === undefined) {
        return;
    }

    //Define Parameters - Calendarific
    let prmCountries = "&country=US";
    let prmYear = "&year=" + eventDate.substr(0, 4);
    let month = parseInt(eventDate.substr(5, 2));
    let day = parseInt(eventDate.substr(8, 2));

    //Define Parameters - Bored
    if (activityType === "anything") {
        activityType = ""
    } else {
        activityType = "&type=" + activityType;
    }

    numParticipants = "?participants=" + numParticipants;
    // access = "&maxaccessibility=" + access;
    // price = "&maxprice=" + price;

    //Define Parameters - Edamam

    //API URLs
    const urlBored = hostBored + numParticipants + activityType; //+ access + price
    const urlDate = hostCalendar + keyCalendar + prmCountries + prmYear;
    const urlFoodish = hostFoodish;

    for (let i = 0; i < 12; i++) {
        //fetch FOODISH
        fetch(urlFoodish)
            .then(function(response) {
                return response.json();
            }).then(function(json) {

                console.log(json);
                imageArray.push(json.image);
            })
            .catch((error) => { console.error(error); });
    }


    fetch(urlDate)
        .then(function(response) {
            return response.json();
        }).then(function(json) {

            console.log(json);


            for (let i = 0; i < json.response.holidays.length; i++) {
                if ((json.response.holidays[i].date.datetime.month === month ||
                    json.response.holidays[i].date.datetime.month === month + 1) &&
                    holiday.length < 12) {
                    holiday.push(json.response.holidays[i].name);
                    holidayDate.push(json.response.holidays[i].date.iso);
                }
            }
        })
        .catch((error) => { console.error(error); });

    //fetch BORED
    for (let i = 0; i < 13; i++) {

        fetch(urlBored)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
if (i < 12) {
                console.log(json);
                dateActivity.push(json.activity);
}
else {
                //Build out the start of the grid
                results += /*Header Div*/
                    "<div class=\"header\">" +
                    /*Intro Div*/
                    "<div class=\"intro\"> Date Ideas:</div>" +
                    /*Description Div*/

                    "</div>" +
                    /*Page Div*/
                    "<div class=\"page\">" +
                    /*ml Div*/
                    "<div class=\"ml\">";

                //Use For-Loop to interate through 12 images
                for (let i = 0; i < 12; i++) {
                    results += /*ml-pnl div*/ "<div class=\"ml-pnl\">" +
                        /*img -- FIX ME: Change URL to pull from API*/
                        "<img class=\"ml-pnl_content-img\" src=\"" + imageArray[i] + "\"/>" +
                        /*img -- FIX ME: Change content to pull from API*/
                        "<div class=\"ml-pnl_content\">Spontaneous activity: <p>" + dateActivity[i]
                        + "</p></div><div class=\"ml-pnl_content\">Reason to celebrate: " + holiday[i]
                        + "</p></div></div>"
                }

                //Close the grid
                results += "</div></div>"
                document.getElementById("result").innerHTML = results;
}

            })
            .catch((error) => { console.error(error); });
    }



    console.log("end of getAPI");

});
