const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restful-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})