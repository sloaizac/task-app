const { Router } = require("express");
const router = Router();
const passport = require("passport");
const db = require("../db/database");

router.post('/login', passport.authenticate('local'), (req, res) => res.json({ user: req.user }));

router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    let sql = "SELECT * FROM users WHERE username = ?";
    let v = [username]
    await db.query(sql, v, async (err, result) => {
        if (err) {
            throw err;
        }
        if (result[0]) {
            res.status(400).json({ message: "username already exist" })
        } else {
            let sql2 = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            let values = [username, email, password]
            await db.query(sql2, values, (err, result) => {
                if (err) {
                    throw err;
                }
                res.send("successfully query");
            })
        }
    })
});

module.exports = router;