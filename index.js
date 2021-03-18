const express= require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://arabian:MIxy3w6dFdE4Qz8b@cluster0.pjygh.mongodb.net/burjAlArab?retryWrites=true&w=majority";

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
const bookings = client.db("burjAlArab").collection("bookings");
console.log('db connection successfully');



  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    console.log(newBooking);

    // bookings.insertOne(newBooking)
    //     .then(result => {
    //   console.log(result);
    // })
})//app.post

})//client.connect

app.get('/', function (req, res) {
  res.send('hello world')
})//app.get




  app.listen(5000);