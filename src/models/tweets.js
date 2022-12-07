const { model, Schema } = require('mongoose')

const tweetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    content: String,
    question: String,
    like: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    answers: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Tweet', tweetSchema, 'tweets');