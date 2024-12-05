const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
Role : {
  type: Boolean,
  require: true
},
img : {
        data: Buffer,
        contentType: String
},
ticketId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Ticket'
},
}, {
  timestamps: true // createdAt and updatedAt
});

const User = mongoose.model("User", userSchema);
module.exports = User;