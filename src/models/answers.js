const { model, Schema} = require('mongoose');

const answerSchema = new Schema ({
    contentAnswer: String,
    repliers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = model("Answer", answerSchema, "answers");