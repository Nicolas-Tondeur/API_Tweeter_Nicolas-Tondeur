const express = require('express');

const controllersUser = require('./controllers/tweeter.controllerUser');
const controllersTweet = require('./controllers/tweeter.controllerTweet');

const dto = require('./dto/tweeter.dtoUser');
const dtoTweet = require('./dto/tweeter.dtoTweet');

const isAuthenticated = require('./middleware/auth');
require('./database')

const app = express();

app.use(express.json());

//------------| méthodes Users |------------//

app.post(
    '/tweeter/register', 
    dto.dtoCreatetUser, 
    controllersUser.createUser
);

app.get(
    '/tweeter/user/:user',
    isAuthenticated, 
    dto.dtoGetUser,
    controllersUser.getUser
);

app.patch(
    '/tweeter/user/:user', 
    isAuthenticated,
    dto.dtoPatchUser,
    controllersUser.patchUser
);

app.delete(
    '/tweeter/user/:user', 
    isAuthenticated,
    dto.dtoDeleteUser,
    controllersUser.deleteUser
);


//------------| méthodes Tweets |------------//

app.post(
    '/tweeter/:user/:tweetId', 
    isAuthenticated,
    dtoTweet.dtoCreateTweet,
    controllersTweet.createTweet
);

app.post(
    '/tweeter/:user/:tweetId/liked',
    isAuthenticated,
    dtoTweet.dtoLikeTweet,
    controllersTweet.likeTweet
);

app.post(
    '/tweeter/:user/:tweetId/:answerId',
    isAuthenticated,
    dtoTweet.dtoAnswerSurvey,
    controllersTweet.answerSurvey
);


app.get(
    '/tweeter/:user/:tweetId', 
    isAuthenticated,
    dtoTweet.dtoGetTweet,
    controllersTweet.getTweet
);

app.patch(
    '/tweeter/:user/:tweetId', 
    isAuthenticated,
    dtoTweet.dtoPatchTweet,
    controllersTweet.patchTweet
);

app.delete(
    '/tweeter/:user/:tweetId',
    isAuthenticated, 
    dtoTweet.dtoDeleteTweet,
    controllersTweet.deleteTweet
);


app.listen(3000, () => {
    console.log('Server running on port 3000')
});