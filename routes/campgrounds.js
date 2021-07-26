const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const ejsMate = require('ejs-mate')
const path = require('path')
const  campgrounds = require('../controllers/campgrounds')
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware')


router.route('/')
.get(catchAsync(campgrounds.index))
.post(isLoggedIn,validateCampground,catchAsync(campgrounds.createNewCamp))


router.get('/new',isLoggedIn, campgrounds.renderNewForm)


router.route('/:id')
.get(catchAsync(campgrounds.showCamp))
.put( isLoggedIn,isAuthor,validateCampground ,catchAsync(campgrounds.editCamp))
.delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCamp))


router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEdit))


module.exports = router