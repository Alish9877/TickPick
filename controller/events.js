const router = require('express').Router()
const insureadmin = require('../middleware/insureadmin')
const Category = require('../models/category')
const Event = require('../models/event')
const User = require('../models/user')
const Comment = require('../models/comment')


router.get('/' , async(req,res) => {
  const user = await User.findById(req.session.user._id)
  const events = await Event.find()
res.render('events/index.ejs',{events,user})
})

router.get('/reserve/:eventId', async(req,res) =>{
const comments = await Comment.find({}).populate('userId', 'username')

const event = await Event.findById(req.params.eventId)
if (event.tickCount <= 0)
  return res.send('Sold out!')
else if (event.tickCount > 0)
  await event.save
console.log(event)
  return res.render('events/reserve.ejs' , {event,comments})
})

router.get('/reserved/:eventId' , async(req,res)=>{
  const reserve = await Event.findById(req.params.eventId)
  if  (reserve.tickCount <= 0)
    return res.send('Sold out!')
  else if (reserve.tickCount > 0)
    return res.send('Ticket reserved!')
  --tickCount
})

router.get('/new' , insureadmin ,async(req,res) => {
  const user = await User.findById(req.session.user._id)
  res.render('events/new.ejs',{user})
})

router.post('/', insureadmin, async (req, res) => {
  try {
    const newEvent = new Event ({
      eventname: req.body.eventname,
      Date: req.body.Date,
      tickCount: req.body.tickCount,
      tickPrice: req.body.tickPrice,
      Category: req.body.Category
    })
    await newEvent.save()
    res.redirect('/events')
  } catch (error) {
    console.log(error)
    res.status(500).send('Error creating event')
  }
})

router.get('/edit/:eventId', insureadmin  , async(req,res) => {
  const event = await Event.findById(req.params.eventId)
  res.render('events/edit.ejs' , {event})
})
router.put('/edit/:eventId', insureadmin  , async(req,res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      {
        eventname: req.body.eventname,
        Date: req.body.Date,
        tickCount: req.body.tickCount,
        tickPrice: req.body.tickPrice,
        Category: req.body.Category
      })
  await event.save()
  res.redirect('/events')
  }
catch (error) {
  console.log(error)
}
})

router.get('/categories/:categoryName', async (req, res) => {
 
  
  try {
    const categoryName = req.params.categoryName;
 console.log('catName', categoryName);
    const events = await Event.find({ Category: categoryName});
   console.log(events , "evvvvvvvvvvvvvvvvvvvvventtt")
    res.render('events/categores.ejs', { categoryName, events });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching events for this category');
  }
});




router.delete('/delete/:eventId' , insureadmin , async(req,res) => {
  try {
    await Event.findByIdAndDelete(req.params.eventId)
    Event.save()
    res.redirect('/events')
  }
  catch (error){
    console.log(error)
  }
})
module.exports = router