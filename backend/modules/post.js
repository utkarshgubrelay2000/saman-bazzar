const mongoose=require("mongoose");
const key=require("./key");

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
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    
});
// sytax in which the data should be entered for authentication
mongoose.connect("mongodb://localhost:27017/travelvilla",{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection;
db.on("error",()=>console.log('database didn"t connect'));

db.once("open",()=> console.log('connection made with post'));
module.exports=mongoose.model("post",newScheme)
