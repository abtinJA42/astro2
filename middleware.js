const {campgroundSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground')
const { reviewSchema} = require('./schemas')
const Review = require('./models/review')


module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be signed in first!')
      return  res.redirect('/login')
    }
    next()
}



module.exports.isAuthor = async(req,res,next) => {
      const {id} = req.params
      const campground = await Campground.findById(id)
      if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission for that')
        return res.redirect(`/campgrounds/${id}`)
      }
      next() 
  }

  
  module.exports.validateCampground = (req,res,next) => {

    const {error} = campgroundSchema.validate(req.body)
    if (error) {
     const msg = error.details.map(el =>{return el.message}).join(',')
        throw new ExpressError(msg,400)
    } else {
        next()
    }
    }


   module.exports.validateReview = (req,res,next) => {
      const {error} = reviewSchema.validate(req.body)
      if (error) {
          const msg =error.details.map(el =>{ return el.message}).join(',')
          throw new ExpressError(msg,400)
       } else {
          next()
      }
       }
  