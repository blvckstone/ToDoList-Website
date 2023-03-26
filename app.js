const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');
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


const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

const List = new mongoose.model("List", listSchema);

// Item.insertMany([reading, writing]).then(function(){console.log("Items Inserted Succcessfully")}).catch(function(err){console.log(err)})



app.get("/", function (req, res) {
  day = date.getDate() //Use Date Module here that you created

  Item.find({}).then(
    function(data){

        if(data.length === 0){

          Item.insertMany([reading, writing]).then(function(){console.log("Items Inserted Succcessfully")}).catch(function(err){console.log(err)})
          res.redirect("/")
        }
        
        
        else{
          res.render("list", { listTitle: day, itemShow: data });
        }
      
        
      
    
    }).catch(function(err){console.log(err)});


  
});

app.get("/:customListName", function(req, res){
  // console.log(req.params.customListName)
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}).then(
    function(data){
      if(!data){

        const list = new List({
          name: customListName,
          items: [reading, writing]
        });
      
        list.save()
        res.redirect("/" + customListName)

      }
      else{
        res.render("list", { listTitle: data.name, itemShow: data.items });
      }
    }
  )

  

})


app.post("/delete", function(req, res){

  // console.log(req.body.checkbox)
  const whichDeleteid = req.body.checkbox;
  const deleteTitle = req.body.deleteTitle
  // console.log(deleteTitle)
  day = date.getDate()

  if(deleteTitle == day){

    Item.findByIdAndRemove(whichDeleteid).then(function(){console.log("Deleted successfully")}).catch(function(err){console.log(err)});
    res.redirect("/")

  }else{
    List.findOneAndUpdate({name: deleteTitle}, {$pull: {items: {_id: whichDeleteid}}}).then(function(foundList){
      res.redirect("/" + deleteTitle)
    })

    
  }

  // Item.deleteOne({_id: whichDeleteid}).then(function(){console.log("Deleted successfully")}).catch(function(err){console.log(err)});
  // res.redirect("/")

  

});




app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", itemShow: workItems });
});

app.get("/about", function(req, res){
    res.render("about")
})

app.post("/", function (req, res) {
  // console.log(req.body.list)


  const userInput = req.body.newItem
  const listname = req.body.list
  day = date.getDate()

  const userItem = new Item({
    name: userInput
  });

  if(listname == day){

    userItem.save();
    res.redirect("/")

  }else{
    List.findOne({name: listname}).then(function(founddata){
      founddata.items.push(userItem)
      founddata.save();
      res.redirect("/" + listname)
    })
  }


  


  

  // if (req.body.list === "Work List") {
  //   workItems.push(req.body.newItem);
  //   res.redirect("/work");
  // } else {
  //   toDoItems.push(req.body.newItem);
  //   res.redirect("/");
  // }
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
