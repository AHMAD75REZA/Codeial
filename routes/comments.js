const express = require('express');
const { Passport } = require('passport');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', commentsController.create);
router.post('/create', passport.checkAuthentication);
module.exports = router;