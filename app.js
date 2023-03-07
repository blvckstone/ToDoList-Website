const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){

    let today = new  Date();
    let currentDay = today.getDay();
    let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = '';

    if(currentDay === 6 || currentDay === 0){
        day = dayArray[currentDay];
    }else{
        day = dayArray[currentDay]
    }



    res.render("list", {kindOfDay: day})






    
})



app.listen(3000, function(){console.log('Server Started!')})