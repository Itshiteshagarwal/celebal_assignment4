const mongoose = require("mongoose");


const mongoUrl = "your connection string here";

const connectToMongo = async()=>{
    await  mongoose.connect(mongoUrl);
    console.log("connect to mongo");
}

module.exports = connectToMongo;