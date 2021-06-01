
const mongoose = require('mongoose')
const cities = require('./cities')
const {places,descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/astro-c',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("database connected")
})

const sample = (array) =>{
  return  array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {
   await Campground.deleteMany({})
  for(let i=0;i<50;i++){
   const random1000 = Math.floor(Math.random()*1000)
   const price = Math.floor(Math.random() * 20)+10
  const camp = new Campground({
    author: '60a8f2b8d3f09e2cecd0bf41',
       location : `${cities[random1000].city} , ${cities[random1000].state}`,
       title: `${sample(descriptors)}  ${sample(places)}`,
       image:'https://source.unsplash.com/collection/429524',
       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur voluptas iusto commodi dolorum mollitia nisi sunt illo veritatis, alias ipsam neque soluta delectus perferendis quas magnam, veniam nesciunt minima molestiae?',
       price
    })
   await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
  })