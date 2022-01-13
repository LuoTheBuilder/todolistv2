//SET UP THE STARTING CONSTANTS
const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));
// var item="happy";
var items =[];
var desc = "";
let workItems=[];
let adj =[];
//CLOSE SET UP OF STARTING CONSTANTS

            //SET UP API FOR ADJECTIVES
            let url = "https://random-word-form.herokuapp.com/random/adjective";
            https.get(url, function(response){
              response.on("data", function(data){
                const adjective= JSON.parse(data);
                desc = adjective;
            })})
            //END API SETUP

            //SET UP INITIAL VARIABLES
            var today = new Date();
            var day = "";
            var options ={
              weekday: "long",
              day: "numeric",
              month: "long"
            };
            //FINISH SET UP OF INITIAL VARIABLES

//GET PAGE FUNCTION
app.get("", function(req, res) {
var theday = today.toLocaleDateString("en-US", options);
  res.render('list', {
    adj: desc,
    kindOfDay: day,
    listTitle: theday,
    newListItems: items
  })
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems,
    adj: desc,
  });
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})
//CLOSE OUT GET PAGE FUNCTION

//POST NEW ITEM FORM FUNCTION
app.post("", function(req, res){
  item = req.body.actionItem;
  items.push(item);
  res.redirect("/");
})
//CLOSE POST NEW ITEM FORM FUNCTION

          //SERVER LISTENER
          app.listen(process.env.PORT || 3000, function(req, res) {
            console.log('Alive!');
          })
          //CLOSE OUT LISTENER
