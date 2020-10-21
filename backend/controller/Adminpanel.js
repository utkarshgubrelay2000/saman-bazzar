const AuthDatabase = require("../modules/authentication");
const CreatePost = require("../modules/post");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const key = require("../modules/key");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: key.auth,
});
module.exports.adminLogin = (req, res) => {
  AuthDatabase.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.json({ error: "admin Not found" });
    } else {
      console.log("here");

      bcrypt
        .compare(req.body.password, user.password)
        .then((ifSame) => {
          if (ifSame) {
            res.json("You will get the Email");
            const token = Math.random() * 10000000;
            transporter.sendMail({
              to: "utkarshgubrelay2000@gmail.com",
              from: "password@gmail.com",
              subject: "Redirect link",

              html: `<p> you requested for password forgot password </p>
            <h5>click here <a href="http://localhost:3000/auth/${token}>Link <a/>  </h5>`,
            });
            user.passwordToken = token;
            user.expireToken = Date.now() + 360000;
            user.save().then((ok) => {
              console.log("saved");
            });
          } else {
            res.json({ error: "user or email is wrong" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};
module.exports.verification = (req, res) => {
  console.log(req.body);

  AuthDatabase.findOne({
    passwordToken: req.body.token,
    expireToken: { $gt: Date.now() },
  }).then((user) => {
    console.log(user);

    if (!user) {
      res.json({ error: "expies" });
      // console.log('here is error');
    } else {
      res.json({ succes: user._id });
    }
  });
};
module.exports.CreatePost = (req, res) => {
  console.log(req.body);
  const post = new CreatePost({
    address: req.body.Address,
    mobile: req.body.Mobile,
    Imagesurl: req.body.imageUrl[0].url,
    company: req.body.company,
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
module.exports.GetPost=(req,res)=>{
  CreatePost.find({}).then(data=>{
res.json(data)
  })
}
module.exports.DeletePost=(req,res)=>{
  console.log(req.body)
  CreatePost.findOneAndDelete({_id:req.body.id}).then(data=>{
CreatePost.find({}).then(newdata=>{
  res.json(newdata)
})
  })
}
