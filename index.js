var express = require("express");
var app     = express();
var path    = require("path");


app.get('/',function(req,res){
    //res.sendFile(path.join(__dirname+'/style.css'));
    //res.sendFile(path.join(__dirname+'/main.js'));
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000);



console.log("Running at Port 3000");