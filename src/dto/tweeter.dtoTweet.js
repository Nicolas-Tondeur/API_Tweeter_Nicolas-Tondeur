const Tweet = require('../models/tweets');
const Answer = require('../models/answers');

//------------| méthodes tweet |------------//

const dtoCreateTweet = async (req, res, next) => {
    try{
        const tweet = req.body.content;
        const answer = req.body.content;

        if (!tweet) {
            res.status(400).send('enter content of tweet');
            return;
        }

        if(!answer){
            res.status(400).send('enter content of survey');
            return;
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).send('une erreur est survenue');
    }
}

const dtoLikeTweet = async (req, res, next) => {
    try{
       
        const tweetId = req.params.tweetId;

        const tweet = await Tweet.findOne({ _id: tweetId })
        if (!tweet) {
            res.status(404).send( "Tweet not found" );
            return;
        }

        next();


    }   catch (error) {
        res.status(500).send('une erreur est survenue !');
    }
}

const dtoAnswerSurvey = async (req, res, next) => {
    try {
        const answerId = req.params.answerId;
        const reponse = await Answer.findOne( {_id: answerId} );

        const tweetId = req.params.tweetId;

        const tweet = await Tweet.findOne({ _id: tweetId })
        if (!tweet) {
            res.status(404).send( "Tweet not found" );
            return;
        }

        if(!reponse){
            res.status(400).send('Answers not found');
            return;
        }

        next();

    }   catch (error) {
        console.log(error);
        res.status(500).send('une erreur est survenue');
    }
}

const dtoGetTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const tweet = await Tweet.findOne({ _id: tweetId });

        if (!tweet) {
            res.status(400).send('Not found');
            return;
        }

        next();
    }   catch (error) {
        res.status(500).send('une erreur est survenue')
    }  
}

const dtoPatchTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;

        const tweet = await Tweet.findOne({ _id: tweetId });
        if (!tweet) {
            res.status(404).send( "Tweet not found" );
            return;
        }

        next();
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }
}

const dtoDeleteTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;

        const tweet = await Tweet.findOne({ _id: tweetId })
        if (!tweet) {
            res.status(404).send( "User not found" );
            return;
        }

        next();
    }   catch (error) {
        res.status(500).send('une erreur est survenue')
    }
}

module.exports = {
    dtoCreateTweet,
    dtoLikeTweet,
    dtoAnswerSurvey,
    dtoGetTweet,
    dtoPatchTweet,
    dtoDeleteTweet
}