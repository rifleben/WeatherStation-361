const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const ejs = require("ejs");
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

app.post("/", async function(req, res){
    try{
        console.log(req.body.city);
        const apiKey = process.env.API_KEY;
        cityName = req.body.city;
        const url = "https://api.weatherapi.com/v1/current.json"
        const params = {key: apiKey, q: cityName};
        let weatherInfo = await axios.get(url, {params});
        let weather = weatherInfo.data;
        console.log(weather);
        let temp_c = weather.current.temp_c;
        let condition = weather.current.condition.text;
        res.render("weather", {
            pageTitle: cityName, cityName: cityName, 
            temp_c: temp_c, condition: condition,
            icon: weather.current.condition.icon,
            temp_f: weather.current.temp_f,
            })
        
    } catch (error) {
        console.error(error);
    }
});



app.listen(3000, function(){
    console.log("Server is running on port 3000");
} );

