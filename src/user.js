const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//inner user schema
const metricsSchema = new Schema({
    order: {
        type: Number,
        default: 1
    },
    mname: {
        type: String,
        default: ''
    }
});

const UserSchema = new Schema({
    name: String,
    count: {
        type:Number,
        default: 0
    },
    metrics: {
        type: metricsSchema,
        default: {}
    },

    lastModified: {
        type: Date,
        default: new Date('2013-10-02T01:11:18.965Z')
    },

    score: Number
});

module.exports = mongoose.model('user', UserSchema);
