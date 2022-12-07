const Tweet = require('../models/tweets');
const Answer = require('../models/answers');

//------------| méthodes tweets |------------//

const createTweet = async (req, res) => {
    try {
        const tweetContent = req.body.content;
        const tweetQuestion = req.body.question;
    
        const newTweet = new Tweet();

        if(tweetQuestion){
            const answer = req.body.answer;
            let i = 0;
            
            newTweet.question = tweetQuestion;
            newTweet.answers = answer;
            
            while(i < newTweet.answers.length){
                const newAnswer = new Answer();
                
                newAnswer.tweet = newTweet._id;
                newAnswer.contentAnswer = answer[i];

                await newAnswer.save();
                i++;

            }

            await newTweet.save();
            res.status(201).json( newTweet )
            return;
        }
        newTweet.user = req.user._id;
        newTweet.content = tweetContent;

        await newTweet.save();

        res.status(201).send('Tweet posted !');
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }      
}

const likeTweet = async (req, res) => {
    try{
        const user = req.user;
        const tweetId = req.params.tweetId;
        const likedTweet = await Tweet.findOne( {_id: tweetId} );

        likedTweet.like.push(user.id);
        await likedTweet.save();

        const nbreLikes = likedTweet.like.length

        res.status(200).json(nbreLikes);
        //res.status(200).send("Tweet liked !");
        //res.status(200).json({ Tweet });


    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }
}

const answerSurvey = async (req, res) => {
    try {
        const user = req.user;
        const answerId = req.params.answerId;
        const reponse = await Answer.findOne( {_id: answerId} );

        reponse.repliers.push(user._id);
        await reponse.save();
        
        const nbreVotes = reponse.repliers.length;
        res.status(200).json( nbreVotes );

        //res.status(200).json({ Answer });

    }   catch (error) {
        console.log(error);
        res.status(500).send('une erreur est survenue');
    }
}

const getTweet = async (req, res) => {
    try {
        const tweetId = req.params.tweetId;

        const tweet = await Tweet.findOne(
            { _id: tweetId },
            // {_id: 0, name: 1}
            );

        res.status(200).json({ tweet });
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }  
}

const patchTweet = async (req, res) => {
    try {
        const tweetId = req.params.tweetId;
        const data = req.body.content;

        const tweet = await Tweet.findOne({ _id: tweetId });

        tweet.content = data;

        await tweet.save();

        res.status(200).json({ content: tweet.content });
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }  
}

const deleteTweet = async (req, res) => {
    try {
        const tweetId = req.params.tweetId;

        const tweet = await Tweet.findOne( { _id: tweetId } );

        await tweet.remove();

        res.status(200).send("tweet deleted !")
    }   catch (error) {
        console.log(error);
        res.status(500).send('une erreur est survenue')
    }  
}

module.exports = {
    createTweet,
    likeTweet,
    answerSurvey,
    getTweet,
    patchTweet,
    deleteTweet
};