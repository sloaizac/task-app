const { Router } = require("express");
const router = Router();
const db = require("../db/database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "mysecret";

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    let sql = "SELECT * FROM users WHERE username = ?";
    let values = [username];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err
        } else {
            if (result[0]) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (err) {
                        throw err;
                    } else if (!response) {
                        res.status(400).json({ message: "password incorrect" });
                    } else {
                        const id = result[0].id;
                        const payload = { id };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '2h'
                        });
                        res.status(200).json({ message: "json token", token: token, user: { id: result[0].id, username: result[0].username } })

                    }
                })
            } else {
                res.status(400).json({ message: "username not found" });
            }
        }
    })

});

router.post('/logout', (req, res) => {
    try {
        req.session.destroy();
        res.json({ message: "logout successfully" })
    } catch (e) {
        res.send(e);
    }
});


router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    let sql = "SELECT * FROM users WHERE username = ?";
    let v = [username]
    db.query(sql, v, (err, result) => {
        if (err) {
            throw err;
        }
        if (result[0]) {
            res.status(400).json({ message: "username already exist" })
        } else {
            let sql2 = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                if (err) {
                    throw err;
                }
                else {
                    let values = [username, email, hashedPassword];
                    db.query(sql2, values, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        res.send(hashedPassword);
                    })
                }
            });
        }
    })
});


module.exports = router;