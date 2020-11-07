const AuthDatabase = require("../modules/authentication");
const CreatePost = require("../modules/post");
const User= require("../modules/Shop");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const key = require("../modules/key");
const jwt=require('jsonwebtoken');

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
  User.findOneAndDelete({_id:req.body.id}).then(data=>{
User.find({}).then(newdata=>{
  res.json(newdata)
})
  })
}
exports.GetParticularUser=(req,res)=>{
  const {id}= req.body
  User.findOne({_id:id},{_id:0}).then(user=>{
    res.json(user)
  })
}
exports.GetProductShop=(req,res)=>{
  console.log(req.params.id)
  const {id}=req.params
  CreatePost.findOne({_id:id}).then(shop=>{
  //  console.log(shop);
  
  CreatePost.aggregate([
    {$group:{
      _id:{userId:shop.userId},
      allproducts:{$push:'$$ROOT'}
    }}
  ]).then(products=>{
    console.log(products);
    res.json(products)
    
  })

  
  })
  
}
exports.GetRecommedProducts=(req,res)=>{

  CreatePost.find({}).limit(4).sort({_id:-1}).then(rproducts=>{
    res.json({recommdation:rproducts})
  }).catch(err=>{
    console.log(err)
  })

}