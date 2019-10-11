const mongoose = require('mongoose');

// Sub-document
const PostSchema = new mongoose.Schema({
  title: String
});

module.exports = PostSchema;
