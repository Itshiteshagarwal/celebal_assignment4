const mongoose = require("mongoose");

const PeopleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    } 
},{
    timestamps:true
});

const People = mongoose.model('people', PeopleSchema);
People.createIndexes();
module.exports = People