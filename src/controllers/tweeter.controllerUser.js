const User = require('../models/users');

//------------| méthodes user |------------//

const createUser = async (req, res) => {
    try {
        const user = req.body.user;

        const newUser = new User();
        newUser.name = user;

        await newUser.save();

        res.status(201).send('User created with success !');
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }      
}

const getUser = async (req, res) => {
    try {
        const user = req.params.user;

        const userTweeter = await User.findOne({ name: user });

        res.status(200).json({ name: userTweeter.name });
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }  
}

const patchUser = async (req, res) => {
    try {
        const user = req.params.user;
        const data = req.body.user;

        const userTweeter = await User.findOne({ name: user });

        userTweeter.name = data;

        await userTweeter.save();
        res.status(200).json({ name: userTweeter.name });
    }   catch (error) {
        res.status(500).send('une erreur est survenue');
    }  
}

const deleteUser = async (req, res) => {
    try {
        const user = req.params.user;

        const userTweeter = await User.findOne( { name: user } );

        await userTweeter.remove();

        res.status(200).send("user deleted !")
    }   catch (error) {
        console.log(error);
        res.status(500).send('une erreur est survenue');
    }  
}

module.exports = {
    createUser,
    getUser,
    patchUser,
    deleteUser
};