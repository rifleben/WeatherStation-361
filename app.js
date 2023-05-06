const path = require("path");
const states = require(path.resolve(__dirname, "alerts", "states.js"));
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { Console } = require("console");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("index", {pageTitle: "Weather App"});
}); 

app.get("/about", function(req, res) {
    res.render("about", {pageTitle: "About"});
});

app.get("/contact", function(req, res) {
    res.render("contact", {pageTitle: "Contact"});
});

app.post("/", async function(req, res){
    try{
        console.log(req.body.city);
        const apiKey = process.env.API_KEY;
        cityName = req.body.city;
        const url = "https://api.weatherapi.com/v1/forecast.json"
        const params = {key: apiKey, q: cityName, days: 3};
        let weatherInfo = await axios.get(url, {params});
        const region = weatherInfo.data.location.region;
        const city= weatherInfo.data.location.name;
        let weather = weatherInfo.data;

        const alertURL = "http://localhost:3450/alerts/city"
        let alertParams = `/${city}-${states[region]}`
        let alertInfo = null;
        let alertTime = 4000;

        try {
            alertInfo = await axios.get(alertURL + alertParams, {timeout: alertTime});
        } catch (err) {
            console.log(`Alerts server error: ${err}`);
            alertInfo = "ERROR"
        }
        
        let alert = null;
        
        if (alertInfo === "ERROR") {
            alert = "There was an error fetching alerts from the microservice. Please try again later.";
        } else {
            const alerts = alertInfo && alertInfo.type ? alertInfo.data : null;
            alert = alerts && alerts.length > 0 ? alerts[0].headline : "There are no alerts for this area at this time. Note alerts only work for US cities.";
        }


        const maxtemp_f = (weather.forecast.forecastday[0].day["maxtemp_f"])
        const mintemp_f = (weather.forecast.forecastday[0].day["mintemp_f"])
        const maxtemp_c = (weather.forecast.forecastday[0].day["maxtemp_c"])
        const mintemp_c = (weather.forecast.forecastday[0].day["mintemp_c"])
        const tomorrowMaxtemp_f = (weather.forecast.forecastday[1].day["maxtemp_f"])
        const tomorrowMintemp_f = (weather.forecast.forecastday[1].day["mintemp_f"])
        const tomorrowMaxtemp_c = (weather.forecast.forecastday[1].day["maxtemp_c"])
        const tomorrowMintemp_c = (weather.forecast.forecastday[1].day["mintemp_c"])
        const dayafterMaxtemp_f = (weather.forecast.forecastday[2].day["maxtemp_f"])
        const dayafterMintemp_f = (weather.forecast.forecastday[2].day["mintemp_f"])
        const dayafterMaxtemp_c = (weather.forecast.forecastday[2].day["maxtemp_c"])
        const dayafterMintemp_c = (weather.forecast.forecastday[2].day["mintemp_c"])
        let temp_c = weather.current.temp_c;
        let condition = weather.current.condition.text;
        res.render("weather", {
            pageTitle: cityName, cityName: cityName, 
            temp_c: temp_c, condition: condition,
            icon: weather.current.condition.icon,
            temp_f: weather.current.temp_f,
            maxtemp_f: maxtemp_f,
            mintemp_f: mintemp_f,
            maxtemp_c: maxtemp_c,
            mintemp_c: mintemp_c,
            tomorrowMaxtemp_f: tomorrowMaxtemp_f,
            tomorrowMintemp_f: tomorrowMintemp_f,
            tomorrowMaxtemp_c: tomorrowMaxtemp_c,
            tomorrowMintemp_c: tomorrowMintemp_c,
            dayafterMaxtemp_f: dayafterMaxtemp_f,
            dayafterMintemp_f: dayafterMintemp_f,
            dayafterMaxtemp_c: dayafterMaxtemp_c,
            dayafterMintemp_c: dayafterMintemp_c,
            alert: alert
            })
        
    } catch (error) {
        // console.error(error);
    }
});



app.listen(3000, function(){
    console.log("Server is running on port 3000");
} );

