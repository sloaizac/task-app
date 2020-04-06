const db = require('../db/database');

eventsCtrl = {};

eventsCtrl.getEvents = async (req, res) => {
    let sql = "SELECT * FROM events WHERE user_id = ?";
    let values = [req.user];
    await db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

eventsCtrl.createEvent = async (req, res) => {
    try {
        const {user_id, title, start, end} = req.body;
        let sql = "INSERT INTO events (user_id, title, start, end) VALUES (?, ?, ?, ?)";
        let values = [user_id, title, start, end];
        await db.query(sql, values,(err, result) => {
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

eventsCtrl.deleteEvent = async (req, res) => {
    try{
        const id = req.params.id;
        let sql = "DELETE FROM events WHERE id =" + id;
        await db.query(sql, (err, result) => {
            if(err){
                throw err;
            }
            res.send("Successfully query");
        })
    }catch (e) {
        res.json({message : e});
    }
}

eventsCtrl.updateEvent = async (req, res) => {
    const {title, start, start_old, end} = req.body;
    console.log(title);
    let sql = "UPDATE events SET title = ? , start =  ? , end = ? WHERE title = ? AND start = ?";
    let values = [title, start, end, title, start_old];
    await db.query(sql, values, (err, result) => {
        if(err){
            throw err;
        }
        
        
        res.send("Sucessfully query");
    })
}

module.exports = eventsCtrl;