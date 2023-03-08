const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let toDoItems = ["Reading", "Swimming", "Riding"];
let workItems = [];

app.get("/", function (req, res) {
  let day = "";
  let today = new Date();
  // let currentDay = today.getDay();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, itemShow: toDoItems });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", itemShow: workItems });
});

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
