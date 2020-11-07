var express = require('express');
var router = express.Router();
const Admin = require('../controller/Adminpanel')
const middlewareVerfication=require('../middleware/requireLogin')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/',Admin.adminLogin)
router.post('/Create/:id', Admin.CreatePost)
router.get('/GetPost', Admin.GetPost)
router.delete('/DeletePost',middlewareVerfication, Admin.DeletePost)
router.delete('/DeleteUser',middlewareVerfication, Admin.DeleteUser)
router.post('/CreateUser', middlewareVerfication,Admin.CreateUser,err=>console.log(err))
router.get('/GetUser',middlewareVerfication, Admin.GetUser,err=>console.log(err))
router.post('/GetParticularUser',middlewareVerfication,Admin.GetParticularUser)
router.get('/GetProductShop/:id',Admin.GetProductShop)
router.get('/GetRecommed',Admin.GetRecommedProducts)
module.exports = router;
