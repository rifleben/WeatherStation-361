const express = require("express");
const https = require("https");
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
        const url = "https://api.weatherapi.com/v1/current.json?key=7fd6ee5501c748e3b7a73000233003&q=" + cityName
        https.get(url, function(response){
            console.log(response.statusCode);
            if (response.statusCode === 400) {
                res.redirect("/");
            } else {
                response.on("data", function(data){
                    const weatherData = JSON.parse(data);
                    console.log (weatherData);
                    const temp = weatherData.current.temp_c;
                    const weatherDescription = weatherData.current.condition.text;
                    const icon = weatherData.current.condition.icon;
                    res.write("<h1>The temperature in " + cityName + " is " + temp + " degrees Celcius.</h1>");
                    res.write("<p>The weather is currently " + weatherDescription + "</p>");
                    res.write("<img src=" + icon + ">");
                    res.send();
                });
            }
        });
    }catch(err){
        res.send(err);
    }
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
} );

