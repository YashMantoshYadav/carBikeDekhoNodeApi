const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port =  process.env.prot || 8000 
require('./database/db')
const path = require('./router/router')



app.use(cors());
app.use(express.json());
app.use('/',path)

app.listen(port,(req,res)=>{
    console.log(`working on http://localhost:${port}`)
})