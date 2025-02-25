const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/inotebook"

async function connecttomongo() {
   await mongoose.connect(mongoURL).then(()=> 
        console.log("Connected to mongo sucessfuly")).catch(err=>console.log(err));
    }
module.exports = connecttomongo;