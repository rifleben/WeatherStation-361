const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("index", {pageTitle: "Weather App"});
}); 




app.post("/", async function(req, res){
    try{
        console.log(req.body.city);
        const apiKey = "7fd6ee5501c748e3b7a73000233003";
        cityName = req.body.city;
        const url = "https://api.weatherapi.com/v1/current.json"
        const params = {key: apiKey, q: cityName};
        let weatherInfo = await axios.get(url, {params});
        let weather = weatherInfo.data;

        res.render("weather", {pageTitle: cityName, cityName: cityName})
        
    } catch (error) {
        console.error(error);
    }
});



app.listen(3000, function(){
    console.log("Server is running on port 3000");
} );

