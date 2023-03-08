const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");  //Created Module
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let toDoItems = ["Reading", "Swimming", "Riding"];
let workItems = [];

app.get("/", function (req, res) {
  day = date.getDate() //Use Date Module here that you created
  res.render("list", { listTitle: day, itemShow: toDoItems });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", itemShow: workItems });
});

app.get("/about", function(req, res){
    res.render("about")
})

app.post("/", function (req, res) {
  // console.log(req.body.list)

  if (req.body.list === "Work List") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    toDoItems.push(req.body.newItem);
    res.redirect("/");
  }
});

app.listen(3000, function () {
  console.log("Server Started!");
});

// let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// if(currentDay === 6 || currentDay === 0){
// day = dayArray[currentDay];
// }else{
// day = dayArray[currentDay]
// }
