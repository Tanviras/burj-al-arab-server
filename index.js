const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://arabian:arabian12345@cluster0.pjygh.mongodb.net/burjAlArab?retryWrites=true&w=majority";


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
  res.send('hello world')
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  const bookings = client.db("burjAlArab").collection("bookings");
  console.log('db connection successfully');

//1st thing to do to connect with client
app.post('/addBooking', (req, res) => {
  const newBooking = req.body;
  console.log(newBooking);
  bookings.insertOne(newBooking)
      .then(result => {
          // res.send(result.insertedCount > 0);
          console.log(result);
      })
})
});


app.listen(5000)