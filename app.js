const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const date = require(__dirname + "/date.js");  //Created Module
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/toDoListDB');

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = new mongoose.model("Item", itemSchema);

const reading = new Item({
  name: "Reading"
});

const writing = new Item({
  name: "Writing"
});

Item.insertMany([reading, writing]).then(function(){console.log("Items Inserted Succcessfully")}).catch(function(err){console.log(err)})

// let toDoItems = ["Reading", "Swimming", "Riding"]; // As we do not need an array to store locally anymore so we comment it out
// let workItems = [];

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
