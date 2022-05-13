const express=require("express");
const ejs=require("ejs");
const req = require("express/lib/request");
const bodyParser=require("body-parser");
const res = require("express/lib/response");
const Today=require(__dirname+"/date.js");
const { redirect } = require("express/lib/response");
const date = require("./date");
const mongoose=require("mongoose");
const app=express();
const _=require("lodash");
let din=Today.getDate();


mongoose.connect('mongodb+srv://sam123:Sam1234@todoapp.7ffi9.mongodb.net/todoList',{useUnifiedTopology: true,useNewUrlParser: true},
() =>console.log("connnected")

);

const toDoSchema=new mongoose.Schema({
    item:String
});
const work=mongoose.model("work",toDoSchema);
const i1=new work({
    item:"study"
});
// i1.save;
const i2=new work({
    item:"working"
});
const defaultItem=[i1,i2];
const Listschema=new mongoose.Schema({
    Item:String,
    Listitem:[toDoSchema]
})
const List=mongoose.model("List",Listschema);


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");
work.find({name:'study'},function(err,items){
    if(err){
        console.log("err is here");
    }
    else{
        const itemss=items;
    }
 
});
app.get("/",function(req,res){
    
     console.log(din);
     work.find({},function(err,items){
        if(items.length===0){
            work.insertMany([i1,i2],function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("inserted Successfully");
                }
});

res.redirect("/");
        }

        else{
            res.render("index",{"Lists":din,"Listitem":items});
        }
     
    });
    

});

app.post("/",function(request,response){
    var i=request.body.Listitem;
    var Listname=request.body.button;

    const itemName=new work({
        item:i
    });
    if(Listname===din){
        console.log("1");
    itemName.save(function(err){ 
       
        response.redirect("/");});
    
   
    }
    else{
        console.log(Listname);
        List.findOne({Item:Listname},function(err,foundItem){
            foundItem.Listitem.push(itemName);
            foundItem.save();
        });
        response.redirect("/"+Listname);
    }
    
})
app.get("/work",function(req,res){

    res.render("index",{"Lists":"To do List","Listitem":itemss});

});
app.post("/delete",function(req,res){
    const id=req.body.checkbox;
    const checkListname=req.body.Listname;
    if(checkListname===din){
    work.findByIdAndRemove(id,function(err){
        if(err){
            console.log("not successfull");
        }
        else{
            console.log("successfull");
        }
    })
    res.redirect("/");
}
else{
    List.findOneAndUpdate({Item:checkListname},{$pull:{Listitem:{_id:id}}},function(err){
        if(!err){
            res.redirect("/"+checkListname);
        }
    });
}

});
app.get("/:customList",function(req,res){
    const Customitem= _.capitalize(req.params.customList);
    const item1=new List({
        Item:Customitem,
        Listitem:defaultItem
    })
    item1.save();
    
    
    List.findOne({Item:Customitem},function(err,result){
        if(!err){
        if(result){
            res.render("index",{"Lists":result.Item,"Listitem":result.Listitem});
            console.log("found");
        }
        else{
            console.log("NOt found");
            const item1=new List({
                Item:Customitem,
                Listitem:defaultItem
            });
            item1.save();
            res.redirect("/"+Customitem);
            
        }
    }
    });

   


});


app.listen(3000,function(req,res){
    // console.log(din);
    console.log("hello");
})