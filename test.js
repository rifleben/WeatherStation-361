const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
}
);

axios.get("https://api.weatherapi.com/v1/current.json?key=7fd6ee5501c748e3b7a73000233003&q=Seattle")
.then(function(response){
    console.log(response.data);
    const temp = response.data.current.temp_c;
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
}
);

