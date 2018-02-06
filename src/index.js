const express = require('express')
const app = express()
const morgan = require('morgan')

const config = require('./config')

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routting
require('./routes/userRoutes')(app)


app.listen(config.port, ()=>{
    console.log(`Server run in port: ${config.port}`)
})