var express = require('express');
var app = express();
var port = 5000;
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient
var mongourl = "mongodb://localhost:27017";
var cors = require('cors');
var db;

app.use(cors());

app.get('/health',(req,res) => {
    res.send("Api is working")
});

//restaurents
app.get('/restaurents',(req,res) => {
    var query = {};
    if(req.query.city){
        query={city:req.query.city}
    }else{
        query={}
    }
    db.collection('restaurent').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongourl,(err,connection) => {
    if(err) throw err;
    db = connection.db('Asgmt7');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})