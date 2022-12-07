const User = require("../models/users")

const isAuthenticated = async (req, res,next) => {
    try{
        const username = req.headers.user
        if(!username){
            res.status(401).send("Connecte toi d'abord")
            return
        }
        const user = await User.findOne({ name: username })
        if (!user){
            res.status(401).send("Vérifie l'orthographe")
            return
        }
        req.user = user
        return next()
        
    }catch(error){
        console.log(error)
        res.status(500).send("Error Auth")
    }
}

module.exports = isAuthenticated