const express= require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

// idToken verification
const admin = require("firebase-admin");
const serviceAccount = require("./burj-khalifa-b53d3-firebase-adminsdk-hy71h-a3b3c01492.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://burjAlArab.firebaseio.com'
});




const databaseName='burjAlArab';
const collections= 'bookings';
const userName='arabian';
const password='kRXf0eNYc6pereHt';
const uri = "mongodb+srv://arabian:kRXf0eNYc6pereHt@cluster0.pjygh.mongodb.net/burjAlArab?retryWrites=true&w=majority";

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
const bookings = client.db("burjAlArab").collection("bookings");
// console.log('db connection successfully');



  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    // console.log(newBooking);
    bookings.insertOne(newBooking)
    .then(result => {
      // console.log(result);
      res.send(result.insertedCount>0);//if it is >0,then something is inserted 
    })
    //  console.log(newBooking);
})//app.post


app.get('/bookings',(req,res)=>{//check http://localhost:5000/bookings

  // console.log(req.headers.authorization);//Thus we will get the jwt token in backend. Then we will verify the jwt token through firebase


  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
  const idToken=req.headers.authorization.split(' ')[1];
  console.log({idToken});//if we get this

  admin.auth().verifyIdToken(idToken)
  .then((decodedToken) => {
    // const uid = decodedToken.uid;
    const tokenEmail = decodedToken.email;
    const queryEmail=req.query.email;
    console.log(tokenEmail,queryEmail); 
    if(tokenEmail==req.query.email){

      // console.log(req.query.email);
      bookings.find({email: req.query.email}) //empty {} means all data has to be retrieved from cluster database
      // booking.find({}).limit()//limiting how many data we will retrieve from cluster database
      //booking.find({email: req.query.email})//accessing the 'email'property from database's data
      
      .toArray((err,documents)=>{
          res.send(documents);
      })
    }
    })
  .catch((error) => {
    // Handle error
  });
  }

})

})//client.connect

app.get('/', function (req, res) {
  res.send('hello world')
})//app.get




  app.listen(5000);