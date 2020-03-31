const {Router} = require("express");
const router = Router();
const passport =  require("passport");
const db = require("../db/database");

router.post('/login', passport.authenticate('local'), (req, res) => res.json({user: req.user}));

router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

module.exports = router;