const assert = require('assert');
const User = require('../src/user');

describe('Deleteting a user', ()=>{
    let user;

    beforeEach(done=>{
        user = new User({name: 'User1'});
        user.save()
        .then(()=>{done();})
    });

    it('model instance remove', (done)=>{
        user.remove()
        .then(()=>User.findOne({name: 'User1'}))
        .then(result=>{
            assert(result===null)
            done();
        })
    });

    it('class method remove', (done)=>{
        User.remove({name: 'User1'})
        .then(()=>User.findOne({name: 'User1'}))
        .then(result=>{
            assert(result===null)
            done();
        })
    });

    it('class method findOneAndRemove', (done)=>{
        User.findOneAndRemove({name: 'User1'})
        .then(()=>User.findOne({name: 'User1'}))
        .then(result=>{
            assert(result===null)
            done();
        })
    });

    it('class method findByIdAndRemove', (done)=>{
        User.findByIdAndRemove(user._id)
        .then(()=>User.findOne({name: 'User1'}))
        .then(result=>{
            assert(result===null)
            done();
        })
    });
});
