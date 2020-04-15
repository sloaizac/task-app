const db = require('../db/database');

eventsCtrl = {};

eventsCtrl.getEvents = (req, res) => {
    let sql = "SELECT * FROM events WHERE user_id = ?";
    let values = [req.user];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

eventsCtrl.createEvent = (req, res) => {
    try {
        const { user_id, title, start, end } = req.body;
        let sql = "INSERT INTO events (user_id, title, start, end) VALUES (?, ?, ?, ?)";
        let values = [user_id, title, start, end];
        db.query(sql, values, (err, result) => {
            if (err) {
                throw err;
            }
            res.send("Successfully query");
        })
    }
    catch (e) {
        res.json({ message: e });
    }
}

eventsCtrl.deleteEvent = (req, res) => {
    try {
        const id = req.params.id;
        let sql = "DELETE FROM events WHERE id =" + id;
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.send("Successfully query");
        })
    } catch (e) {
        res.json({ message: e });
    }
}

eventsCtrl.updateEvent = (req, res) => {
    const { title, start, end } = req.body;
    let sql = "UPDATE events SET title = ? , start =  ? , end = ? WHERE id = ?";
    let values = [title, start, end, req.params.id];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }


        res.send("Sucessfully query");
    })
}

module.exports = eventsCtrl;