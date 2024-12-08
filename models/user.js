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
  role: {
    type: String,
    default: 'guest', // Default role
},
  img: {
    data: Buffer,
    contentType: String,
    url: {
        type: String,
        default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-1023x1024-ucnnjrj1.png', // Default image URL
    }},
  ticketId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Ticket'
}}, 
{
  timestamps: true // createdAt and updatedAt
});

const User = mongoose.model("User", userSchema);
module.exports = User;