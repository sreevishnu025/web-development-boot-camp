const express = require("express");

const https = require("https");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

function captaliseFirstLetter(data){
    var  restString = data.substr(1).toLowerCase();;
    var letter1  = data.slice(0,1).toUpperCase();
    return letter1+restString;
}

app.get("/", function (req,res){

    res.sendFile(__dirname+"/index.html");
})

app.post("/", function (req,res){

      const appId = "cedfed885774563fa410d6f0ec8e8e88";
    const units = "metric";
    const city = captaliseFirstLetter(req.body.city);

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&appid="+appId+"&units="+units;

       https.get(url, function (response){
        console.log(response.statusCode);

        response.on("data", function (data){
            const weatherData = JSON.parse(data);
            const wheatherIcon = " http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";

            console.log(weatherData.main.temp);
            res.write("<h1>The temperature in "+city+" is "+weatherData.main.temp+" degress celcuis </h1>" );
            res.write('<img src="'+wheatherIcon+'" />' );
            res.write("<p>The weather is currently "+weatherData.weather[0].description+ "<//p>");
            
        })
    })

})




app.listen(3000 , function (){
    console.log("server is running on port 3000");
})