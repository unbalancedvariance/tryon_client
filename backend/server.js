// Imports
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')


const chatRoutes = require('./routes/chat.js')
// pull the express app.
const app = express()

// Middleware?? 

app.use(cors({
    origin: '*',
}))
 
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
}) // Basically log all the paths and their methods.

app.use(express.json())

// Routes
app.use('/api/chats',chatRoutes) // for a specific route,make a route handler.

// // Intro Route
// app.get('/',(req,res) => {
//     res.json({msg:'Welcome to the app'})
// })

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // Listening to port 4000.
        app.listen(process.env.PORT,()=>{
        console.log("connected to database and listening to port: " + process.env.PORT)
})

    })
    .catch((error)=>{
        console.log(error)
    })


/*
API Endpoints:
Gets all workout documents -> GET /workouts
Creates a new workout document -> POST /workouts
Gets a single workout document -> GET /workouts/:id
Delete a single workout document -> DELETE /workouts/:id
Delete all workout documents -> DELETE
Update a single workout document -> PATCH
*/
