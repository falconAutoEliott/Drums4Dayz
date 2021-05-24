var express = require("express");
var app     = express();
var path    = require("path");


<<<<<<< HEAD
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

=======
app.use(express.static(__dirname));
>>>>>>> parent of e7d4d03 (Update index.js)
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.listen(process.env.PORT);
//app.listen(3000);

console.log("Great Success!");