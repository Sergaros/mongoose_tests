const assert = require('assert');
const User = require('../src/user');

describe('Operators', ()=>{
    let user;

    beforeEach(done=>{
        user = new User({name: 'User1'});
        user.save()
        .then(()=>{done();})
    });

    context('$currentDate operator', ()=>{

        it('Update date to current', done=>{
            User.update({name: 'User1'}, {$currentDate: {lastModified: true}})
            .then(()=>{
                User.findOne({name: 'User1'})
                .then(user=>{
                    let today = new Date();
                    assert(user.lastModified.getFullYear() === today.getFullYear());
                    assert(user.lastModified.getMonth() === today.getMonth());
                    assert(user.lastModified.getDate() === today.getDate());

                    done();
                })
            })
        });
    });

    context('$inc operator', ()=>{

        it('Increment field by 1', done=>{
            User.update({name: 'User1'}, {$inc: {count: 1}})
            .then(()=>{
                User.findOne({name: 'User1'})
                .then(user=>{
                    assert(user.count === 1);
                    done();
                })
            })
        });

        it('Increment nested field by 1', done=>{
            User.update({name: 'User1'}, {$inc: {"metrics.order": 1}})
            .then(()=>{
                User.findOne({name: 'User1'})
                .then(user=>{
                    assert(user.metrics.order === 2);
                    done();
                })
            })
        });

        it('Increment field and nested field by 2 and -1', done=>{
            User.update({name: 'User1'}, {$inc: {count: 2, "metrics.order": -1}})
            .then(()=>{
                User.findOne({name: 'User1'})
                .then(user=>{
                    assert(user.count === 2);
                    assert(user.metrics.order === 0);
                    done();
                })
            })
        });

    });

    context('$min/$max operators', ()=>{

        beforeEach(done=>{
            user = new User({name: 'User1', score: 500});
            user.save()
            .then(()=>{done();})
        });

        it('Update min resolve - ', done=>{
            User.update({name: 'User1'}, {$min: {score: 150}})
            .then(()=>{
                User.findOne({name: 'User1'})
                .then(user=>{
                    assert(user.score === 150);
                    done();
                })
            })
        });

        it('Update min reject - ', done=>{
            User.update({name: 'User1'}, {"$min": {"score": 700} })
            .then(()=>{
                console.log('111')
                //done();
                User.findOne({name: 'User1'})
                .then(user=>{
                    console.log('222', user.score)
                    //assert(user.score === 500);
                    done();
                })
            })

            //done();

        });
    })


});
