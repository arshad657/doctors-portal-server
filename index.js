const express = require('express')
const { MongoClient } = require('mongodb');

const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = 'mongodb+srv://Arshad:mUxt_5L7eni9KdU@cluster0.piuzs.mongodb.net/doctors_portal?retryWrites=true&w=majority';
console.log(uri)
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

async function run() {
  try{
    await client.connect();
    const database = client.db('doctors_portal')
    const appointmentsCollection = database.collection('appointments')

    app.post('/appointments', async(req, res) => {
      const appointment = req.body;
      const result = await appointmentsCollection.insertOne(appointment);
      console.log(result)
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