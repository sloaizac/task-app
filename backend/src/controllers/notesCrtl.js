const db = require('../db/database');

notesCtrl = {};

notesCtrl.getNotes = (req, res) => {
    let sql = "SELECT * FROM notes WHERE user_id = ?";
    let values = [req.user];

    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
}

notesCtrl.createNote = (req, res) => {
    try {
        const { user_id, title, description } = req.body;
        let sql = "INSERT INTO notes (user_id, title, description) VALUES (?, ?, ?)";
        let values = [user_id, title, description];
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

notesCtrl.deleteNote = (req, res) => {
    try {
        const id = req.params.id;
        let sql = "DELETE FROM notes WHERE notes.id =" + id;
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

notesCtrl.updateNote = (req, res) => {
    const { id, title, description } = req.body;
    let sql = "UPDATE notes SET title = ? , description =  ? WHERE id = " + id;
    let values = [title, description];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.send("Sucessfully query");
    })
}

module.exports = notesCtrl;