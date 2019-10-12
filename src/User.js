const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = require('./PostSchema');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }]
});

// Defining a getter function postCount, using the 'function' keyword to access 'this'
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// Defining middleware for pre-remove operation
UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  // this === joe
  BlogPost.deleteMany({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
