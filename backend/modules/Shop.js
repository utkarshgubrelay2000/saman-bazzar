const mongoose=require("mongoose");
const key=require("./key");
const schema= mongoose.Schema;
const newScheme=new schema({
    Shop:{
        type:String,    
        required:true
    },
    OwnerName:{
        type:String,
        required:true
    },
    Profile:{
        type:String,
        required:true
    },
  Mobile:{
        type:String,
        required:true
    },
  address:{
        type:String,
        required:true
    },
    
});
module.exports=mongoose.model("Saman-bazzar-Shops",newScheme)
