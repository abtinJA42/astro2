const express = require('express')
const User = require('../models/user')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')
const passport = require('passport')
const router = express.Router()


router.route('/register')
.get( users.renderRegister)
.post( catchAsync(users.register))

router.route('/login')
.get( users.renderLogin)
.post(passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}), users.login)


router.get('/logout' , users.logout)


module.exports = router