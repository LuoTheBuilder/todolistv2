//SET UP THE STARTING CONSTANTS
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));
// var item="happy";
var items =[];
//CLOSE SET UP OF STARTING CONSTANTS

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
app.get("/", function(req, res) {
var theday = today.toLocaleDateString("en-US", options);
  res.render('list', {
    kindOfDay: day,
    theday: theday,
    newListItems: items
  })
})
//CLOSE OUT GET PAGE FUNCTION

//POST NEW ITEM FORM FUNCTION
app.post("/", function(req, res){
  item = req.body.actionItem;
  items.push(item);
  res.redirect("/");
})
//CLOSE POST NEW ITEM FORM FUNCTION

          //SERVER LISTENER
          app.listen(3000, function(req, res) {
            console.log('Alive!');
          })
          //CLOSE OUT LISTENER
