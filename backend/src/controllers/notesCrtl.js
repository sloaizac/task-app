const db = require('../db/database');

notesCtrl = {};

notesCtrl.getNotes = async (req, res) => {
    let sql = "SELECT * FROM notes";
    await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

notesCtrl.createNote = async (req, res) => {
    try {
        const {title, description} = req.body;
        let sql = "INSERT INTO notes (user_id, title, description) VALUES (?, ?, ?)";
        let values = [1, title, description];
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

notesCtrl.deleteNote = async (req, res) => {
    try{
        const id = req.params.id;
        let sql = "DELETE FROM notes WHERE notes.id =" + id;
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

module.exports = notesCtrl;