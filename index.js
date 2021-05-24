var express = require("express");
var app     = express();
var path    = require("path");


app.get('/',function(req,res){
    //res.sendFile(path.join(__dirname+'/style.css'));
    //res.sendFile(path.join(__dirname+'/main.js'));
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.PORT);



console.log("Great Success!");