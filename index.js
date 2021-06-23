require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/index')
const db = require('./config/setup').MONGO_URI

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

router.init(app)

mongoose
  .connect(db,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Louvre-Online Backend</h1>`)
})

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log(`Server up and running on port ${port}`)
})
