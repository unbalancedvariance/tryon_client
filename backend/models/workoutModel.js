const mongoose = require('mongoose') // we need mongoose to create and modify data and models.


const Schema = mongoose.Schema // this is a function

// Schema helps us define the structure of a type of a document.
const WorkoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type:Number,
        required: true
    },
    load:{
        type: Number,
        required: true
    },
},{timestamps:true})

module.exports = mongoose.model('Workout',WorkoutSchema)
