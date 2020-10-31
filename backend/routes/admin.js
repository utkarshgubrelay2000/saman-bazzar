var express = require('express');
var router = express.Router();
const Admin = require('../controller/Adminpanel')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', Admin.adminLogin)
router.post('/Create', Admin.CreatePost)
router.get('/GetPost', Admin.GetPost)
router.delete('/DeletePost', Admin.DeletePost)
router.post('/verification', Admin.verification,err=>console.log(err))
router.post('/CreateUser', Admin.CreateUser,err=>console.log(err))
module.exports = router;
