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

module.exports = router
