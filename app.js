const express=require("express");
const app = express();
const path= require('path')
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance',{useNewUrlParser:true,useUnifiedTopology:true});
const port=8000;
const bodyparser=require("body-parser")

var contactSchema =new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String,
});
var contact = mongoose.model('contact',contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine',"pug")
app.set('views',path.join(__dirname,"views"))



app.get("/",(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)
});
app.get("/contact",(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params)
});
app.post("/contact",(req,res)=>{
    var myData= new contact(req.body)
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    })
    .catch(()=>{
        res.status(400).send("item was not saved to the databased")
    });
    // res.status(200).render('contact.pug')
});


app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});
