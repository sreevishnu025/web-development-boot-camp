const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({exteended: true }));

app.get("/",function (req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function (req,res){
 var num1 = Number(req.body.num1);
 var num2 = Number(req.body.num2);
 
res.send("The result is "+(num1+num2));


});

app.listen(3000,function (){
    console.log("server is running in port 3000");
});
