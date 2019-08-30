const mongoose = require('mongoose');
const validator = require('validator')
require('../db/mongoose.js')

const User = mongoose.model('User',{
    name:{
        type:String,
        require:true,
        trim: true
    },
    password:{
        type:String,
        trim:true,
        require:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("invalid password..Haven't include 'password' word !!")
            }
        }
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email !!")
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0)
            {
                throw new Error("Age must be posative number !!")
            }
        }
    }
})


module.exports = User

// const newUser = User({
//     name:'ahmed',
//     password:"123pdspkds",
//     email:"ahmed@gmail.com",
//     age:24
// })