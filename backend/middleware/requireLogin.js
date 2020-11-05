const jwt=require('jsonwebtoken')
const User =require('../modules/authentication')
module.exports=(req,res,next)=>{
 const {authorization}=req.headers
   // console.log(req.headers.authorization)
    if(authorization){
const token = authorization.replace('Bearer ' ,"")
jwt.verify(token,"uhdiuagdgwodgq77228",(err,payload)=>{
    if(err || payload===undefined){
        res.status(404).json(err)
    }
    else{
        console.log(payload.secretId);
        User.findOne({_id:payload.secretId}).then(user=>{
            if(user){
                return  next();
            }
            else{
                res.status(404).json('User not found')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

})
//res.status(404).json('eror')
    
}
}