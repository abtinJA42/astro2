const User = require('../models/user')
const passport = require('passport')
const ExpressError = require('../utils/ExpressError')


module.exports.renderRegister = (req,res) => {
    res.render('users/register')
    }


 module.exports.register = async(req,res) =>{
    try{
    const {email , username, password} = req.body
    const user = new User({email,username})
    const registeredUser = await User.register(user,password)
    req.login(registeredUser, err =>{
        if(err) return next(err)
        req.flash('success','Welcome to Astro Camp')
        res.redirect('/campgrounds')
    })
    } catch(e){
     req.flash('error',e.message)
     res.redirect('/register')
    }
} 


module.exports.renderLogin = (req,res) =>{
    res.render('users/login')
}


module.exports.login = (req,res) =>{
    req.flash('success','welcome back!')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
 }


 module.exports.logout = (req,res)=>{
    req.logOut()
    req.flash('success' , 'Logged you out!')
    res.redirect('/campgrounds')
}