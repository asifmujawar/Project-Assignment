const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobno:{
        type:String
    },
    password:{
        type:String
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
})

module.exports = mongoose.model('User-information',dataSchema);