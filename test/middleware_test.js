const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../src/User');
const BlogPost = require('../src/BlogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is great!',
      content: 'It really is!'
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('cleans up dangling blogposts associated with a user on remove', done => {
    joe
      .remove()
      .then(() => BlogPost.countDocuments())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
