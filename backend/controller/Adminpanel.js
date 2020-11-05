const AuthDatabase = require("../modules/authentication");
const CreatePost = require("../modules/post");
const User= require("../modules/Shop");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const key = require("../modules/key");
const jwt=require('jsonwebtoken');
const Shop = require("../modules/Shop");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: key.auth,
});
module.exports.adminLogin = (req, res) => {
  AuthDatabase.findOne({ email: req.body.email,password:req.body.password }).then((user) => {
    if (!user) {
      res.json({ error: "admin Not found" });
    } else {
      console.log("here");
      const token=jwt.sign({secretId:user._id}, "uhdiuagdgwodgq77228")
      console.log(token);
      res.json({
        succes:token
      });

    }})}

module.exports.CreateUser = (req, res) => {
  console.log(req.body);
  const post = new User({
    address: req.body.Address,
    Mobile: req.body.Mobile,
    Profile: req.body.imageUrl[0],
    Shop:req.body.shop,
    OwnerName:req.body.shopOwner
  });
  post.save().then(user=>{
    if(user){
      res.json({data:"saved"}) 
    }
    else{
      res.json({error:'something went wrong'})
    }

  })
};
module.exports.CreatePost = (req, res) => {
  const post = new CreatePost({
    address: req.body.Address,
    mobile: req.body.Mobile,
    Imagesurl: req.body.imageUrl[0],
    Shop: req.body.company,
    userId:req.params.id
  });
  post.save().then(user=>{
    if(user){
      CreatePost.find({}).then(userdata=>{
        res.json({data:userdata}) 
      })
    }
    else{
      res.json({error:'something went wrong'})
    }

  })
};
module.exports.GetPost=(req,res)=>{
  CreatePost.find({}).then(data=>{
res.json(data)
  })
}
module.exports.GetUser= (req,res)=>{
  
  User.find({}).then(data=>{
 //  console.log(data);
   res.json(data)
    
  }).catch(err=>{
    console.log(err);
    return
  })
}
module.exports.DeletePost=(req,res)=>{
 // console.log(req.body)
  CreatePost.findOneAndDelete({_id:req.body.id}).then(data=>{
CreatePost.find({}).then(newdata=>{
  res.json(newdata)
})
  })
}
module.exports.DeleteUser=(req,res)=>{
  //console.log(req.body)
  Shop.findOneAndDelete({_id:req.body.id}).then(data=>{
Shop.find({}).then(newdata=>{
  res.json(newdata)
})
  })
}
exports.GetParticularUser=(req,res)=>{
  const {id}= req.body
  Shop.findOne({_id:id},{_id:0}).then(user=>{
    res.json(user)
  })
}