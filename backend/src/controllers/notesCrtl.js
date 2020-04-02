const db = require('../db/database');

notesCtrl = {};

notesCtrl.getNotes = async (req, res) => {
    
    let sql = "SELECT * FROM notes WHERE user_id = ?" ;
    let values = [req.user[0].id];
    
    await db.query(sql, values, (err, result) => {
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
        let values = [req.user[0].id, title, description];
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

notesCtrl.updateNote = async (req, res) => {
    const {id, title, description} = req.body;
    let sql = "UPDATE notes SET title = ? , description =  ? WHERE id = " + id;
    let values = [title, description];
    await db.query(sql, values, (err, result) => {
        if(err){
            throw err;
        }
        res.send("Sucessfully query");
    })
}

module.exports = notesCtrl;