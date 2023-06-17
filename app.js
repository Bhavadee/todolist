
const express = require('express');
const bodyParser = require('body-parser');
var ejs = require('ejs');
const port = 9930;

const app = express();
var items = ["buy","make","Eat"];
app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('CSS'));
app.get('/', (req, res) => {
  var day = new Date();
  
  var options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  var da = day.toLocaleDateString("en-IN",options);
    res.render("list", {title:da , newTasks:items});
  
    
});
 app.post("/", (req,res) =>{
   items.push(req.body.listItem);
   res.redirect("/")
})



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

