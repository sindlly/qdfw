var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var userSchema=new Schema({
    "name" :String,
    "role":Number,
    "grade":{
        A:Number,
        B:Number,
        C:Number
    },
})
module.exports=mongoose.model('members',userSchema);
