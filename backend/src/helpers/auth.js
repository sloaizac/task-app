const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){ //Invicamos la funcion isAuthenticated que nos brinda passport js
        next()
    }
    res.status(400).json({message: "You need login"});
}

module.exports = helpers;