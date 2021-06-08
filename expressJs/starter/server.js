const express = require("express");

const app = express();

app.get("/",function (req,res){
   res.send("hello world");
});

app.listen(3000, function (){
    console.log("server is running in port 3000");
});
