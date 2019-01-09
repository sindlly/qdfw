var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var userSchema=new Schema({
    "_id": Number,
    "name" :String,
    "id":String,
    "pm":String,
})
module.exports=mongoose.model('user',userSchema);
