const express=require('express');
const postController=require('../controllers/postcontroller');
const router=express.Router();
router.post('/create-post',postController.create);
router.get('/destroy/:id',postController.destroy)
router.get('/destroy-comment/:id',postController.destroycomment);
router.post('/create-comment',postController.comment);
module.exports=router;