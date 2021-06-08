const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];
let title = "";

let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("us-en",options);


app.get("/",function (req,res){
    

    res.render("list",{KindDay: day,todo: items,title: "" });
})
app.post("/",function (req,res){
    if(req.body.btn === "Work"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
        items.push(req.body.newItem);
        res.redirect("/");
    }
    
   
})

app.get("/work", function (req,res){
    
    title = "Work list";
    res.render("list",{KindDay: day,todo: workItems,title: title });

})

app.get("/about",function (req,res){
    res.render("about");
})

app.listen(3000, function (){
    console.log("server is running on port 3000.");
})