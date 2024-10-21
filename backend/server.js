require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB Connected Successfully')
})
.catch((error)=>{
    console.log('Error Connecting to MongoDB')
})

module.exports = mongoose