const User = require('../models/users');

//------------| méthodes user |------------//

const dtoCreatetUser = async (req, res, next) => {
    try{
        const user = req.body.user;
        const userExist = await User.findOne({ name: user });

        if (userExist) {
            res.status(400).send('This user already exist');
            return;
        }

        if (!user) {
            res.status(400).send('Username missing');
            return;
        }

        next();

    } catch (error) {
        res.status(500).send('une erreur est survenue');
    }
}

const dtoGetUser = async (req, res, next) => {
    try {
        const user = req.params.user;
        const userTweeter = await User.findOne({ name: user });

        if (!userTweeter) {
            res.status(400).send('Not found');
            return;
        }

        next();
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }  
}

const dtoPatchUser = async (req, res, next) => {
    try {
        const user = req.params.user;

        const userTweeter = await User.findOne({ name: user });
        if (!userTweeter) {
            res.status(404).send( "User not found" );
            return;
        }

        next();
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }
}

const dtoDeleteUser = async (req, res, next) => {
    try {
        const user = req.params.user;

        const userTweeter = await User.findOne({ name: user });
        if (!userTweeter) {
            res.status(404).send( "User not found" );
            return;
        }

        next();
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }
}

module.exports = {
    dtoCreatetUser,
    dtoGetUser,
    dtoPatchUser,
    dtoDeleteUser
}