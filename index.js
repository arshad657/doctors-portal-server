const express = require('express')
const { MongoClient } = require('mongodb');

const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors());

const uri = 'mongodb+srv://Arshad:mUxt_5L7eni9KdU@cluster0.piuzs.mongodb.net/?retryWrites=true&w=majority';
console.log(uri)

app.get('/', (req, res) => {
  res.send('Hello Doctors Portal!')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})