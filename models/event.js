const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
CategoryId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category'
},
}, {
  timestamps: true // createdAt and updatedAt
});


const Event = mongoose.model("Event", eventSchema);
module.exports = Event;