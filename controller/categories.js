const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Comment = require('../models/comment')

// GET Route: Display comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({}).populate('userId', 'username')
    res.render('events/show.ejs', { comments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).send('An error occurred while fetching comments.')
  }
})


router.post('/', async (req, res) => {
  try {
    const newComment = {
      discription: req.body.discription,
      userId: req.session.user._id, // Ensure req.session.user._id exists
      eventId: req.body.eventId
    }
    await Comment.create(newComment)
    res.redirect('/comments')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating comment')
  }
//Root route
router.get('/' , async(req,res) => {
  const categories = await Categories.find()
  const user = await User.findById(req.session.user._id)
res.render('categories/index.ejs',{categories,user})
})

router.get('/my-comments', async (req, res) => {
  try {
    if (!req.session.user) {
      return res
        .status(401)
        .send('Unauthorized: Please log in to view your comments.')
    }

    const userId = req.session.user._id
    const comments = await Comment.find({ userId }).populate(
      'userId',
      'username'
    )

    res.render('events/my-comments.ejs', { comments })
  } catch (error) {
    console.error('Error fetching user comments:', error)
    res.status(500).send('An error occurred while fetching your comments.')
  }
})

router.delete('/my-comments/:id', async (req, res) => {
  try {
    const { id } = req.params

    const comment = await Comment.findById(id)
    await comment.deleteOne()

    res.redirect(/comments/my - comments)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/my-comments/:commentId/edit', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate(
      'userId',
      'username'
    )

    res.render('events/edit-comment.ejs', { comment })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/my-comments/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const { discription } = req.body

    const comment = await Comment.findById(id)
    comment.discription = discription

    await comment.save()

    res.redirect(/comments/my - comments)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
module.exports = router
