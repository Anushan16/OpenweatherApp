const { response } = require('express');
const express = require('express');
const app = express();
// native package to make https requests (allows access to a server)
const https = require("https");




app.get("/", function(req,res) {

    // URL of API 
    const requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=Nobleton,Ontario&appid=1f07abc0605750db339a60e9da6fd0e0&units=metric" 
    // Secure get request and the raw , unformatted JSON is returned back 
    https.get(requestUrl, function(apiResponse) {
        // console.log(apiResponse.statusCode)
        // console.log(apiResponse.statusMessage)
        
        // Response is logged in hexadecimal format
           apiResponse.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const weatherDescription = weatherData.weather[0].description
            const temp = Math.round(weatherData.main.temp)
            const name = weatherData.name
            const iconW = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/"+iconW+"@2x.png"
          
            
            

            // use res.write to display multiple lines of code as res.send only allows to be utilized once
            res.write("<h1>The temperature in " + name + " is currently " +  temp + " degrees celsius</h1>" )
            res.write("<h3>Outside , it looks like there is " +  weatherDescription + "</h2>" )
            // use image tag to send imageURL's to client
            res.write("<img src='" + imageUrl+ "'/>")
            

            res.send()
        })


    })

    app.get('/image', function (req, res) {
     res.sendFile(imageUrl);
});

    
})


app.listen(3000, function() {
    console.log("app is listening on port 3000...")
})