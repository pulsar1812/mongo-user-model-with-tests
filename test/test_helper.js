const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Only execute once
before(done => {
  mongoose.connect('mongodb://localhost/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  mongoose.connection.collections.users.drop(() => done());
});
