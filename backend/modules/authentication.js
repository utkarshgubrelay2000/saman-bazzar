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
// sytax in which the data should be entered for authentication
mongoose.connect("mongodb://localhost:27017/travelvilla",{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection;
db.on("error",()=>console.log('database didn"t connect'));

db.once("open",()=> console.log('connection made with databse'));
module.exports=mongoose.model("saman-bazzar",newScheme)
