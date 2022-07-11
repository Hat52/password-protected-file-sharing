const mongoose = require('mongoose')

const file = mongoose.Schema({
    path:{
        type:String,
        required:true,
    },
    originalName:{
        type:String,
        require:true
    },
    password:String,
    downloadCount:{
        type:Number,
        required:true,
        default:0
    }
})

module.exports = mongoose.model('File',file)