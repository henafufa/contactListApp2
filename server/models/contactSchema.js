//require nodejs modules
var mongoose = require ('mongoose');

//contact schema which describe contact document structure
var contactSchema= mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:false 
    },
    phone:{
        type:String,
        required:true,
        unique:false  
    }
});

module.exports= mongoose.model('contactSchema', contactSchema);
