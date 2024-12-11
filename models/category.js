const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  Category: {
    type: String,
    required: true
  }
}, {
  timestamps: true // createdAt and updatedAt
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
