const assert = require('assert');
const User = require('../src/user');

describe('Creating records', ()=>{
    let user;

    beforeEach(done=>{
        user = new User({name: 'User1'});
        user.save()
        .then(()=>{done();})
    });

    it('find a user', (done)=>{
        User.findOne({name: 'User1'})
        .then(result=>{
            assert(user._id.equals(result._id));
            done();
        })
    });

    it('find a user with a particular id', (done)=>{
        User.findOne({_id: user._id})
        .then(result=>{
            assert(result.name === 'User1');
            done();
        })
    });
});
