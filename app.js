
const express = require('express');
const bodyParser = require('body-parser');
var ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const port = 9930;

app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('CSS'));

mongoose.connect('mongodb://127.0.0.1:27017/todolist')
  .then(() => console.log('Connected!'));

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: "wlecome"
});
const item2 = new Item({
  name: "hit me"
});
const defaul = [item1,item2];




app.get('/', async(req, res) => {
  let foundItems = await Item.find();
  if(foundItems.length == 0){
    Item.insertMany(defaul);
    res.redirect("/")
  }else{
    res.render("list", {title:"Today", newTasks:foundItems});
  }
    
});
 app.post("/", (req,res) =>{

   const newItems = req.body.listItem;
   const item = new Item({
    name: newItems
   });
  item.save();

  res.redirect("/")
});
 app.post("/delete",async (req,res) =>{

   const checkItemId = req.body.checkbox;
   console.log(checkItemId);
    await Item.findOneAndDelete({name:checkItemId});
  res.redirect("/")
})



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

