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

app.post("/weather", async function(req, res){
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
            const alerts = alertInfo && alertInfo.data ? alertInfo.data : null;
            console.log(alerts)
            alert = alerts && alerts.length > 0 ? alerts[0].headline : "There are no alerts for this area at this time. Note alerts only work for US cities.";
        }
        res.render("weather", {
            weatherData: weather,
            pageTitle: weather.location.name,
            alert: alert
            })
        
    } catch (error) {
        // console.error(error);
    }
});



app.listen(3000, function(){
    console.log("Server is running on port 3000");
} );

