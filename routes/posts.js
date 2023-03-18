const express = require('express');
const { Passport } = require('passport');
const router = express.Router();
const passport = require('passport');
const postsController = require('../controllers/posts_controller');

router.post('/create', postsController.create);
router.post('/create',passport.checkAuthentication);
module.exports = router;