const express = require('express')
const router = express.Router({mergeParams:true})
const { reviewSchema} = require('../schemas')
const Review = require('../models/review')
const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleware')
const Campground = require('../models/campground')
const reviews = require('../controllers/reviews')
const methodOverride = require('method-override')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')




router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview))
 
 
 router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))



 module.exports = router