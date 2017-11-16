const assert = require('assert');
const User = require('../src/user');

const assertName = (operation, done)=>{
    operation
    .then(()=>User.find({}))
    .then(users=>{
        assert(users.length === 1);
        assert(users[0].name==='User2');
        done();
    })
};

describe('Updating a user', ()=>{
    let user;

    beforeEach(done=>{
        user = new User({name: 'User1'});
        user.save()
        .then(()=>{done();})
    });

    it('model instance update', (done)=>{
        assertName(user.update({name: 'User2'}), done);
    });

    it('model instance \'set\' and \'save\'', (done)=>{
        user.set('name', 'User2');
        assertName(user.save(), done);
    });

    it('model class update', (done)=>{
        assertName(
            User.update({name: 'User1'}, {name: 'User2'}),
            done
        );
    });

    it('model class findOneAndUpdate', (done)=>{
        assertName(
            User.findOneAndUpdate({name: 'User1'}, {name: 'User2'}),
            done
        );
    });

    it('model class findByIdAndUpdate', (done)=>{
        assertName(
            User.findByIdAndUpdate(user._id, {name: 'User2'}),
            done
        );
    });
});
