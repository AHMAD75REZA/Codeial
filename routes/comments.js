const express = require('express');
const { Passport } = require('passport');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy', passport.checkAuthentication, commentsController.detroy);


module.exports = router;