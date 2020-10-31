const mongoose=require("mongoose");
const key=require("./key");
const schema= mongoose.Schema;
const newScheme=new schema({
    email:{
        type:String,    
        required:true
    },
    password:{
        type:String,
        required:true
    },
    passwordToken:{
        type:String
    },
    expireToken:{
        type:String
    },
    
});
module.exports=mongoose.model("saman-bazzar",newScheme)
