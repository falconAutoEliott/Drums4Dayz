let http = require('http');
let fs = require('fs');
const express = require('express');
const app = new express();

app.get('/', function(request, response){
    response.sendFile('index.html');
});
