const express = require('express')
const { MongoClient } = require('mongodb');

const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://Arshad:${process.env.DB_PASS}@cluster0.piuzs.mongodb.net/doctors_portal?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

async function run() {
  try{
    await client.connect();
    const database = client.db('doctors_portal')
    const appointmentsCollection = database.collection('appointments')
    const usersCollection = database.collection('user')

    app.get('/appointments', async(req, res)=> {
      const email = req.query.email;
      const date = req.query.date;
      const query = {email: email, date: date}
      const cursor = appointmentsCollection.find(query)
      const appointments = await cursor.toArray()
      res.json(appointments)
    })

    app.post('/appointments', async(req, res) => {
      const appointment = req.body;
      const result = await appointmentsCollection.insertOne(appointment);
      console.log(result)
      res.json(result)
    })

    app.post('/users', async(req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user)
      console.log(result)
      res.json(result)
    });

    app.put('/users', async(req, res) => {
      const user = req.body;
      console.log('put',user)
      const filter = {email: user.email}
      const options = {upsert: true}
      const updateDoc = {$set: user}
      const result = await usersCollection.updateOne(filter, updateDoc, options);
      res.json(result)
    })
    
    console.log('database connected successfully')
  }
  finally{
    //await client.close()
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Doctors Portal!')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})