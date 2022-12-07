const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', userSchema, 'users');