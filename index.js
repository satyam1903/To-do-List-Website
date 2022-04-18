const express=require("express");
const ejs=require("ejs");
const req = require("express/lib/request");
const bodyParser=require("body-parser");
const res = require("express/lib/response");
const Today=require(__dirname+"/date.js");
const { redirect } = require("express/lib/response");
const date = require("./date");
const app=express();
// var items=[];
// const WorkItem=[];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");
app.get("/",function(req,res){
    let din=Today.getDate();
     console.log(din);
    
    res.render("index",{"Lists":din,"Listitem":items});
});
app.post("/",function(request,response){
    var i=request.body.Listitem;
    
    if(request.body.button==="work"){
        WorkItem.push(i);
      
        response.redirect("/work");
    }
    else{
    items.push(i);
    console.log(i);
    response.redirect("/");
    } 
})
app.get("/work",function(req,res){
    res.render("index",{"Lists":"work","Listitem":WorkItem});
});


app.listen(3000,function(req,res){
    // console.log(din);
    console.log("hello");
})