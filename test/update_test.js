const assert = require('assert');

const User = require('../src/User');

describe('Updating records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  const assertName = (operation, done) => {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  };

  it('instance set and save', done => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('a model instance can update', done => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  it('a model class can update', done => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('a model class can update one record', done => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('a model class can find a record with an id and update', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });
});
