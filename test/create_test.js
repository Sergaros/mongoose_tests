const assert = require('assert');
const User = require('../src/user');

describe('Creating records', ()=>{
    it('saves a user', (done)=>{
        const user1 = new User({name: 'User1'});
        user1.save()
        .then(user=>{
            assert(user.name === 'User1');
            assert(!user.isNew);
            done();
        })
    });
});
