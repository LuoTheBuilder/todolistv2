const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');


app.get("/", function(req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var currentDate = today.getDate();
  var currentMonth = today.getMonth() + 1;
  var currentYear = today.getFullYear();
  var day = "";

  switch (currentDay) {
    case 0:
      theday = "sunday";
      break;
    case 1:
      theday = "monday";
      break;
    case 2:
      theday = "Tuesday"
      break;
    case 3:
      theday = "Wednesday"
      break;
    case 4:
      theday = "Thursday"
      break;
    case 5:
      theday = "Friday"
      break;
    case 6:
      theday = "Saturday"
      break;
    default:
  }

  if (currentDay === 6 || currentDay === 0) {
    day = "weekend";
  } else {
    day = "weekday";
  }
  res.render('list', {
    kindOfDay: day,
    theday: theday,
    todaydate: currentDate,
    todaymonth: currentMonth,
    todayyear: currentYear
  })

})


app.listen(3000, function(req, res) {
  console.log('Alive!');
})
