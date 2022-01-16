//SET UP THE STARTING CONSTANTS
const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/noteDB');


// var item="happy";
var items = [];
var adj = "";
//CLOSE SET UP OF STARTING CONSTANTS

const itemSchema = new mongoose.Schema({
  name: String,
})
const Item = mongoose.model("Item", itemSchema);

// const note1 = new Item({
//   name: "get a nice night"
// })
//
// const note2 = new Item({
//   name: "get a bad night"
// })
//
// const note3 = new Item({
//   name: "get a mediocre night"
// })
//
// // Item.insertMany([note1, note2, note3]);
// getNotes();







//SET UP API FOR ADJECTIVES
let url = "https://random-word-form.herokuapp.com/random/adjective";
https.get(url, function(response) {
  response.on("data", function(data) {
    adj = JSON.parse(data);
  })
})
//END API SETUP




//SET UP INITIAL VARIABLES
var today = new Date();
var day = "";
var options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};
//FINISH SET UP OF INITIAL VARIABLES




//GET PAGE FUNCTION
app.get("", function(req, res) {
  var theday = today.toLocaleDateString("en-US", options);
  Item.find({}, function(err, items) {
    res.render('list', {
      adj: adj,
      kindOfDay: day,
      listTitle: theday,
      newListItems: items
    })
  })
})
//CLOSE OUT GET PAGE FUNCTION



//Delete Elemets Function
app.post("/delete", function(req, res){
  let delIt = req.body.checky;
  Item.deleteOne({name:delIt}, function(err){});
  res.redirect("/")
})



//POST NEW ITEM FORM FUNCTION
app.post("", function(req, res) {
  item = req.body.actionItem;
  const addItem = new Item({
    name: item,
  })
  addItem.save();
  res.redirect("/");
})
//CLOSE POST NEW ITEM FORM FUNCTION



//SERVER LISTENER
app.listen(process.env.PORT || 3000, function(req, res) {
  console.log('Alive!');
})
//CLOSE OUT LISTENER
