const mongoose = require('mongoose')


function connectDB() {
    mongoose.connect('mongodb://localhost:27017/gym').then(() => {
        console.log("mongoDB connected")
    }).catch((error) => {
        console.log("Failed to connect mongoDB", error)
    })
}

module.exports = connectDB