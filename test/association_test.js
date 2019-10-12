const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../src/User');
const BlogPost = require('../src/BlogPost');
const Comment = require('../src/Comment');

describe('Assocations', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is great!',
      content: 'It really is!'
    });
    comment = new Comment({ content: 'This is a great post!' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is great!');
        done();
      });
  });

  // Nested populate methods to get the details inside
  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is great!');
        assert(
          user.blogPosts[0].comments[0].content === 'This is a great post!'
        );
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
