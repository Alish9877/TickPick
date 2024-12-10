const router = require('express').Router();
const insureadmin = require('../middleware/insureadmin')
const Event = require('../models/event');
// const Category = require('../models/categories');
// router.get('/events' , async (req,res) => {
//   try { const events = await Event.find({}).populate('CategoryId')
//   console.log(events)
//   res.render('events/index.ejs')
// }
// catch (error){
//   console.log(error)
//   res.redirect('/')
// }
// })
router.get('/' , async(req,res) => {
  const events = await Event.find()
res.render('events/index.ejs',{events})
})
router.get('/reserve/:eventId', async(req,res) =>{
const event = await Event.findById(req.params.eventId)
if (event.tickCount <= 0)
  return res.send('Sold out!')
else if (event.tickCount > 0)
  return res.send('Ticket reserved!')
await event.save
})
router.get('/new' , insureadmin ,(req,res) => {
  res.render('events/new.ejs')
})
// router.post('/' , insureadmin , async(req,res) => {
//   const newevent = await Event.findById(req.session.user._id)
//   newevent.event.push(req.body)
//   await newevent.save()
//   res.redirect('/events')
// })
router.post('/', insureadmin, async (req, res) => {
  try {
    // Create a new event, set the data passed in req.body
    const newEvent = new Event({
      eventname: req.body.eventname,
      Date: req.body.Date,
      tickCount: req.body.tickCount,
      userId: req.session.user._id,
      tickPrice: req.body.tickPrice,
      Category: req.body.Category
    });
    // Save the new event
    await newEvent.save();
    // Redirect to events list after creation
    res.redirect('/events');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating event');
  }
});
router.get('/admin/edit/:eventId', insureadmin  , async(req,res) => {
  const event = await Event.findById(req.params.eventId)
  res.render('editEvent' , {event})
})
router.put('/admin/edit/:eventId', insureadmin  , async(req,res) => {
try {
  await Event.findByIdAndUpdate(req.params.eventId , req,body)
  res.redirect('/events')
}
catch (error) {
  console.log(error)
}
})
router.delete('/events/delete/:eventId' , insureadmin , async(req,res) => {
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

