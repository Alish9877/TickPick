const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    eventname: {
      type: String,
      required: true
    },
    Date: {
      type: Date,
      required: true
    },
    tickCount: {
      type: mongoose.Schema.Types.Number,
      ref: 'Tickets'
    },
    tickPrice: {
      type: mongoose.Schema.Types.Number,
      ref: 'Tickets'
    },
    Category: {
      type: String,
      require: true 
    }
  },
  {
    timestamps: true // createdAt and updatedAt
  }
)

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
