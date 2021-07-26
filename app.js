const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const Joi = require('joi')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError')
const catchAsync = require('./utils/catchAsync')
const {campgroundSchema , reviewSchema} = require('./schemas')
const ejsMate = require('ejs-mate')
const Campground = require('./models/campground')
const Review = require('./models/review')
const campgroundRoute = require('./routes/campgrounds')
const reviewRoute = require('./routes/reviews')
const userRoute = require('./routes/users')
const passport = require('passport')
const User = require('./models/user')
const LocalStrategy = require('passport-local')




mongoose.connect('mongodb://localhost:27017/astro-c' ,{
    keepAlive:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})


const db = mongoose.connection
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("database connected")
})

const app = express()


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.engine('ejs', ejsMate)
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

const sessionConfigue = {
    secret: 'thisshoulbeabettersecret',
    resave : false,
    saveUninitialized:true,
    cookie : {
        httpOnly : true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7,

    }
}

app.use(session(sessionConfigue))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy( User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




app.use((req,res,next) => {
 console.log(req.session)   
 res.locals.currentUser = req.user
 res.locals.success = req.flash('success') 
 res.locals.error = req.flash('error')
 next()
})


app.use('/campgrounds',campgroundRoute)
app.use('/campgrounds/:id/reviews',reviewRoute)
app.use('/',userRoute)
    




app.get('/' , (req,res)=>{
    res.render('home')
})


app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found',404))
})

app.use((err,req,res,next) =>{
    const {statusCode=500}=err
    if(!err.message) err.message('Oh No , Something went wrong')
    res.status(statusCode).render('error',{err})
})

app.listen(3000, ()=>{
    console.log('Serving on port 3000')
})
