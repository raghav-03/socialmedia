const express=require('express');
const passport=require('passport');
const profileController=require('../controllers/profile');
const router=express.Router();


router.get('/profile',passport.checkauthentication,profileController.home);
router.get('/signup',profileController.signup);
router.get('/signin',profileController.signin);
router.post('/create',profileController.create);
router.post('/update/:id',profileController.update);
//for local 
// router.post('/session',profileController.session);
// by using passport.js
router.post('/session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'}
),profileController.session)
router.get('/signout',profileController.destroy);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signin'}),profileController.session)

module.exports=router;