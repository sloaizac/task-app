const {Router} = require("express");
const router = Router();

const db = require("../db/database");

router.get('/', (req, res) => {
    res.send("HOME");
})

module.exports = router;