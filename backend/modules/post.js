const mongoose=require("mongoose");

const schema= mongoose.Schema;
const newScheme=new schema({
    address:{
        type:String,    
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    Imagesurl:{
        type:Arraya,
        required:true
    },
    Shop:{
        type:String,
        required:true
    },
});
// sytax in which the data should be entered for authentication

module.exports=mongoose.model("post",newScheme)
