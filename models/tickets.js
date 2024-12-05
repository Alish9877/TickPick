const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  tickType: {
    type: String,
    required: true
  },
tickCount : {
  type: Number,
  require: true,
  min: 0
},
tickPrice : {
  type: Number,
  require: true,
  min: 0
}
}, {
  timestamps: true // createdAt and updatedAt
});


const Tickets = mongoose.model("Tickets", ticketSchema);
module.exports = Tickets;