const express=require('express');
const passport=require('passport');
const homeController=require('../controllers/homecontroller');
const router=express.Router();
router.get('/:id',homeController.home);
router.get('/',homeController.home1);
router.use('/user',require('./profile'));
router.use('/post',require('./post'));
router.use('/api',require('./api'));
module.exports=router;